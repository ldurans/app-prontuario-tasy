from django.db import connections
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager
from django.core.cache import cache
import json
from django.core.cache import cache


class ListarLaudos(ListAPIView):
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
        str_cache = f'laudos_paciente_{cd_pessoa_fisica}'

        with connections['udi'].cursor() as cursor:
            laudos_nao_convetidos = f'''
                SELECT
                a.NR_SEQUENCIA
                FROM LAUDO_PACIENTE A
                LEFT JOIN UDI_HTML_LAUDOS l
                ON (a.NR_SEQUENCIA = l.NR_SEQ_LAUDO)
                WHERE A.CD_PESSOA_FISICA = '{cd_pessoa_fisica}' 
                AND l.NR_SEQ_LAUDO IS NULL
                AND A.DT_LIBERACAO IS NOT NULL
            '''

            cursor.execute(laudos_nao_convetidos)
            converter = self.dictfetchall(cursor)

            if bool(converter):
                for row in converter:
                    sequencia = int()
                    html = cursor.callproc('udi_laudo_rtf_html', [
                        row['NR_SEQUENCIA'],
                        cd_pessoa_fisica,
                        'APPUDI',
                        sequencia
                    ])

            if not bool(converter) and (str_cache in cache):
                cache_laudos = cache.get(str_cache)
                return Response(cache_laudos, status.HTTP_200_OK)

            laudos = f'''
                SELECT 
                a.nr_sequencia,
                a.nr_atendimento,
                a.nm_usuario,
                a.DS_TITULO_LAUDO,
                a.DS_PROCS_ADIC,
                a.DT_LAUDO,
                a.DT_EXAME,
                a.DT_LIBERACAO,
                a.NM_MEDICO_SOLIC_CRM,
                a.NM_MEDICO_CRM,
                a.NR_ACESSO_DICOM,
                a.IE_STATUS_LAUDO,
                l.DS_TEXTO,
                SubStr(obter_solicitacao_laudo_pep( a.nr_prescricao, a.nr_atendimento ), 1, 10) as ds_solicitacao, 
                SubStr(obter_execucao_laudo_pep( a.nr_prescricao, a.nr_atendimento ),1 ,10) as ds_execucao
                FROM   laudo_paciente_v a
                INNER JOIN UDI_HTML_LAUDOS l
                ON (a.NR_SEQUENCIA = l.NR_SEQ_LAUDO)
                where  a.cd_pessoa_fisica = '{cd_pessoa_fisica}'
                AND A.DT_CANCELAMENTO IS NULL
                AND a.DT_LIBERACAO IS NOT NULL   
                --and Obter_Se_Status_laudo_lib(ie_status_laudo, 133, 1962, NR_SEQ_INTERNO_PRESCR, 'LDURANS') = 'S' 
                ORDER BY a.nr_atendimento DESC, 
                a.nr_laudo DESC,
                a.dt_laudo DESC
            '''

            cursor.execute(laudos)
            laudos = self.dictfetchall(cursor)
            laudos_tratados = []
            for e in laudos:
                e['DS_TEXTO'] = str(e['DS_TEXTO'])
                laudos_tratados.append(e)

            # timeout 10d
            cache.set(str_cache, laudos_tratados, timeout=60*60*24*10)
            return Response(laudos_tratados, status.HTTP_200_OK)
