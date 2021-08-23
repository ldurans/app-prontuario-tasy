from django.db import connections
from django.core.cache import cache
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager

from datetime import datetime, timedelta


class ListarSetoresInternacao(ListAPIView):
    queryset = UserManager
    permission_classes = [AllowAny]

    def dictfetchall(self, cursor):
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        if 'setores' in cache:
            setores = cache.get('setores')
            return Response(setores, status.HTTP_200_OK)

        with connections['udi'].cursor() as cursor:
            query = f'''
                SELECT
                CD_SETOR_ATENDIMENTO cd_setor,
                DS_SETOR_ATENDIMENTO ds_setor,
                cd_classif_setor cd_classificacao,
                OBTER_DESCRICAO_DOMINIO(1,cd_classif_setor) ds_classificacao
                FROM SETOR_ATENDIMENTO
                WHERE CD_CLASSIF_SETOR IN(3,4)
                AND IE_SITUACAO = 'A'
                ORDER BY 4, 2
            '''
            cursor.execute(query)
            rows = self.dictfetchall(cursor)
            cache.set('setores', rows, timeout=60*60*2)  # timeout 2h
            return Response(rows, status.HTTP_200_OK)


class ListarPacientesSetor(ListAPIView):
    queryset = UserManager
    permission_classes = [AllowAny]
    timeout = 60*60*24*10  # 10 dias

    def dictfetchall(self, cursor):
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def consultarPacientes(self, str_cache, setor):
        with connections['udi'].cursor() as cursor:
            query = f'''
                    SELECT
                        O.NR_ATENDIMENTO,
                        OBTER_DADOS_ATENDIMENTO(O.NR_ATENDIMENTO,'NP') NM_PESSOA_FISICA_REAL,
                        Obter_InitCap(obter_primeiro_ultimo_Nome(o.cd_pessoa_fisica)) nm_pessoa_fisica,
                        O.CD_UNIDADE,
                        O.CD_UNIDADE_BASICA,
                        O.CD_UNIDADE_COMPL,
                        --- 4 - UTI , 3 - UI 
                        OBTER_CLASSIF_SETOR(o.cd_setor_atendimento) cd_classif_setor,
                        O.DT_ENTRADA_UNIDADE,
                        O.DT_ENTRADA,
                        O.CD_PESSOA_FISICA,
                        to_char(O.DT_NASCIMENTO, 'dd/mm/yyyy') || ' (' ||OBTER_IDADE(o.DT_NASCIMENTO,SYSDATE,'AM') ||')' DT_NASCIMENTO,
                        OBTER_MEDICO_RESP_ATEND(O.NR_ATENDIMENTO,'N') NM_MEDICO_RESP,
                        udi_obter_primeiro_ultimo_Nome(Obter_enfermeiro_resp(O.nr_atendimento,'D')) nm_colab_resp,
                        --- substr(obter_pontuacao_mews(O.nr_atendimento,0),1,20) qt_pontuacao_mews, /*ofensor de peformance*/
                        O.IE_STATUS_UNIDADE,
                        udi_obter_primeiro_ultimo_Nome(O.NM_GUERRA) nm_guerra,
                        O.DS_STATUS_UNIDADE,
                        O.DT_PREVISTO_ALTA,
                        /* -- ofensor de peformance
                        CASE WHEN OBTER_IDADE(o.DT_NASCIMENTO,SYSDATE,'A') >= '13'
                            THEN substr(obter_pontuacao_mews(O.nr_atendimento,0),1,20)
                            --ELSE udi_obter_pontuacao_pews(O.NR_ATENDIMENTO)
                        END qt_pontuacao_mews_pews, */
                        CASE WHEN o.DT_ALTA_MEDICO IS NULL
                            THEN 'N'
                            ELSE 'S'
                        END IE_ALTA_MEDICA
                    FROM    ocupacao_unidade_v o
                    WHERE   o.cd_setor_atendimento = '{setor}'
                    ORDER BY o.nr_seq_apresent, o.cd_unidade
                '''
            try:
                cursor.execute(query)
                rows = self.dictfetchall(cursor)
                cache.set(f'{str_cache}-pacientes', rows,
                          timeout=self.timeout)  # timeout ?
                return Response(rows, status.HTTP_200_OK)
            except Exception as err:
                return Response({"error": err.__cause__}, status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        setor = request.query_params.get('setor', None)
        if not bool(setor):
            return Response({'error': 'Um setor deve ser selecionado!'},
                            status.HTTP_400_BAD_REQUEST
                            )

        str_cache = f'setor-{setor}'
        data_unidade_cache = ''
        data_unidade = ''
        # with connections['udi'].cursor() as cursor:
        #     q = f'''
        #             select
        #             max(O.DT_ENTRADA_UNIDADE) DT_ENTRADA_UNIDADE
        #             FROM ocupacao_unidade_v o
        #             WHERE   o.cd_setor_atendimento = {setor}
        #         '''
        #     try:
        #         cursor.execute(q)
        #         data = self.dictfetchall(cursor)
        #         data_unidade = data[0]['DT_ENTRADA_UNIDADE']

        #     except Exception as err:
        #         return self.consultarPacientes(str_cache, setor)

        # if bool(str_cache) and bool(data_unidade) and str_cache in cache:
        #     data_unidade_cache = cache.get(str_cache)
        #     diff = datetime.timestamp(
        #         data_unidade) > datetime.timestamp(data_unidade_cache)
        #     dados_cache = cache.get(f'{str_cache}-pacientes')
        #     print('VERIFICAR', diff, bool(diff), bool(dados_cache))
        #     if not diff and bool(dados_cache):
        #         return Response(dados_cache, status.HTTP_200_OK)

        # # cache timeout 10d
        # cache.set(str_cache, data_unidade, timeout=self.timeout)  # timeout 10d
        return self.consultarPacientes(str_cache, setor)
