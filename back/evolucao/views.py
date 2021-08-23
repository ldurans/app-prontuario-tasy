from django.db import connections
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager
from django.core.cache import cache
import json
from django.core.cache import cache


class ListarEvolucoes(ListAPIView):
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
        str_cache = f'evolucao_atendimento_{nr_atendimento}'

        with connections['udi'].cursor() as cursor:
            evolucoes_nao_convertidas = f'''
                select 
                    a.CD_EVOLUCAO  
                from EVOLUCAO_PACIENTE a
                left JOIN UDI_EVOLUCAO_RTF_HTML b
                ON (a.CD_EVOLUCAO = b.CD_EVOLUCAO)
                Where b.CD_EVOLUCAO IS NULL
                --and cd_pessoa_fisica = {cd_pessoa_fisica}
                and nr_atendimento = {nr_atendimento}
                and a.ie_situacao = 'A' 
                and ie_tipo_evolucao <> '9' 
                and dt_liberacao is not null 
                and dt_inativacao is null  
            '''
            cursor.execute(evolucoes_nao_convertidas)
            converter = self.dictfetchall(cursor)

            if bool(converter):
                for row in converter:
                    sequencia = int()
                    html = cursor.callproc('udi_converte_rtf_html', [
                        'SELECT ds_evolucao FROM evolucao_paciente WHERE cd_evolucao = :cd_evolucao',
                        row['CD_EVOLUCAO'],
                        'APPUDI',
                        sequencia
                    ])

            if not bool(converter) and (str_cache in cache):
                cache_evolucoes = cache.get(str_cache)
                return Response(cache_evolucoes, status.HTTP_200_OK)

            evolucoes = f'''
                select 
                    a.NR_ATENDIMENTO,
                    a.CD_EVOLUCAO,
                    case
                        when IE_EVOLUCAO_CLINICA = 'RA' then a.DS_EVOLUCAO
                    end DS_TEXTO,
                    case
                        when IE_EVOLUCAO_CLINICA != 'RA' then b.DS_TEXTO
                    end DS_EVOLUCAO,
                    to_char(a.DT_EVOLUCAO, 'DD/MM/YYYY hh24:mi') DT_EVOLUCAO,
                    a.NM_USUARIO,
                    a.DT_LIBERACAO,
                    a.CD_MEDICO,
                    a.IE_EVOLUCAO_CLINICA,
                    a.IE_TIPO_EVOLUCAO,
                    a.CD_PESSOA_FISICA,
                    substr(obter_nome_pessoa_fisica(cd_medico, null),1,200) NM_MEDICO  ,
                    substr(obter_valor_dominio(72, ie_tipo_evolucao),1,200) DS_TIPO_EVOLUCAO  ,
                    substr(Obter_desc_tipo_evolucao(ie_evolucao_clinica),1,200) DS_SUBTIPO_EVOLUCAO,
                    substr(obter_desc_espec_medica(CD_ESPECIALIDADE),1,50) DS_ESPECIALIDADE  ,
                    substr(obter_desc_espec_medica(CD_ESPECIALIDADE_MEDICO),1,50) DS_ESPECIALIDADE_PROF  ,
                    substr(obter_dados_pf(CD_MEDICO,'COPR'),1,40)  DS_CRM_PROF  
                from EVOLUCAO_PACIENTE a
                inner JOIN UDI_EVOLUCAO_RTF_HTML b
                ON (a.CD_EVOLUCAO = b.CD_EVOLUCAO)
                Where 1 = 1
                --and cd_pessoa_fisica = {cd_pessoa_fisica}
                and nr_atendimento = {nr_atendimento}
                and a.ie_situacao = 'A' 
                and ie_tipo_evolucao <> '9' 
                and dt_liberacao is not null 
                and dt_inativacao is null  
                Order by CD_PESSOA_FISICA desc , DT_EVOLUCAO DESC
            '''
            cursor.execute(evolucoes)
            evolucoes = self.dictfetchall(cursor)
            evolucoes_tratadas = []
            for e in evolucoes:
                # 'RA' já são evoluções em texto simples
                if e['IE_EVOLUCAO_CLINICA'] != 'RA':
                    e['DS_EVOLUCAO'] = str(e['DS_EVOLUCAO'])

                if e['IE_EVOLUCAO_CLINICA'] == 'RA':
                    e['DS_EVOLUCAO'] = str(e['DS_TEXTO'])
                    del e['DS_TEXTO']

                evolucoes_tratadas.append(e)

            # timeout 10d
            cache.set(str_cache, evolucoes_tratadas, timeout=60*60*24*10)
            return Response(evolucoes_tratadas, status.HTTP_200_OK)
