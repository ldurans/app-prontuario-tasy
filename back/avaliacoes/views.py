from django.db import connections
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager
from django.core.cache import cache
import json
from django.core.cache import cache


class ListarAvaliacoes(ListAPIView):
    queryset = UserManager
    permission_classes = [IsAuthenticated]

    def dictfetchall(self, cursor):
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        nr_atendimento = request.query_params.get('nr_atendimento', None)
        cd_pessoa_fisica = request.query_params.get('cd_pessoa_fisica', None)
        str_cache = f'avaliacoes_atendimento_{nr_atendimento}'

        with connections['udi'].cursor() as cursor:
            avaliacoes_nao_convertidas = f'''
                SELECT 
                    a.NR_SEQUENCIA 
                FROM med_Avaliacao_paciente a
                LEFT JOIN UDI_HTML_AVALICAO b
                ON ( a.NR_SEQUENCIA = b.NR_SEQ_AVALIACAO )
                WHERE a.NR_ATENDIMENTO = {nr_atendimento}
                AND b.NR_SEQ_AVALIACAO IS NULL
                AND a.IE_SITUACAO = 'A'
                AND a.DT_INATIVACAO IS NULL
                AND a.DT_LIBERACAO IS NOT NULL
            '''
            cursor.execute(avaliacoes_nao_convertidas)
            converter = self.dictfetchall(cursor)

            if bool(converter):
                for row in converter:
                    html = cursor.callproc('UDI_GERAR_HTML_AVALIACAO', [
                        row['NR_SEQUENCIA'],
                        'APPUDI'
                    ])

            if not bool(converter) and (str_cache in cache):
                cache_avaliacoes = cache.get(str_cache)
                return Response(cache_avaliacoes, status.HTTP_200_OK)

            avaliacoes = f'''

                SELECT
                    substr(obter_descricao_padrao('MED_TIPO_AVALIACAO','DS_TIPO', a.NR_SEQ_TIPO_AVALIACAO),1,100) DS_TIPO_AVALIACAO,
                    substr(obter_nome_pessoa_fisica(a.CD_MEDICO,null),1,200) NM_MEDICO,
                    a.DT_AVALIACAO,
                    substr(Obter_Dados_Usuario_Opcao(a.nm_usuario,'DF'),1,100) DS_FUNCAO_USUARIO,
                    b.DS_TEXTO,
                    a.NR_SEQUENCIA,
                    a.CD_PESSOA_FISICA,
                    a.CD_MEDICO,
                    a.DT_ATUALIZACAO,
                    a.DT_LIBERACAO,
                    a.NM_USUARIO,
                    a.NR_ATENDIMENTO
                from MED_AVALIACAO_PACIENTE a
                INNER JOIN UDI_HTML_AVALICAO b
                ON (a.NR_SEQUENCIA = b.NR_SEQ_AVALIACAO)
                Where 1 = 1
                and a.nr_atendimento = {nr_atendimento}  
                and a.dt_liberacao is not NULL
                and a.dt_inativacao is NULL
                AND a.IE_SITUACAO = 'A'
                Order by a.DT_AVALIACAO desc
            '''

            cursor.execute(avaliacoes)
            avaliacoes = self.dictfetchall(cursor)
            avaliacoes_tratadas = []
            for e in avaliacoes:
                e['DS_TEXTO'] = str(e['DS_TEXTO'])
                avaliacoes_tratadas.append(e)

            cache.set(str_cache, avaliacoes, timeout=60*60*24*10)
            return Response(avaliacoes, status.HTTP_200_OK)
