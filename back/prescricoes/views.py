from django.db import connections
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager
from django.core.cache import cache
import json
from django.core.cache import cache


class ListarPrescricoes(ListAPIView):
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
            prescricoes = f'''
                SELECT 	a.NR_PRESCRICAO,
                    a.CD_PESSOA_FISICA,
                    a.NR_ATENDIMENTO,
                    a.DT_PRESCRICAO,
                    a.DT_LIBERACAO,
                    a.DT_VALIDADE_PRESCR,
                    a.NR_HORAS_VALIDADE,
                    a.DS_JUSTIFICATIVA,
                    a.DT_SUSPENSAO,
                    nvl(a.dt_liberacao,a.dt_liberacao_medico) dt_liberacao_prescr,
                    substr(obter_nome_medico(a.cd_medico,'N'),1,150) nm_medico,   
                    --substr(obter_desc_protocolo(cd_protocolo),1,255)desc_protocolo,
                    --substr(obter_desc_protocolo_medic(nr_seq_protocolo,cd_protocolo),1,50)ds_medic_protocolo,
                    substr(obter_valor_dominio(9,a.ie_origem_inf),1,100) ds_origem_inf, 
                    to_number(obter_cirurgia_prescricao(a.nr_prescricao)) nr_cirurgia_grid,
                    substr(obter_funcao_usuario_orig(a.nm_usuario_original),1,240) ds_funcao_prescritor,
                    substr(obter_itens_prescr(a.nr_prescricao, a.ds_itens_prescr),1,255) ds_item, 
                    substr(a.ds_observacao,1,255) ds_observacao_grid,
                    substr(obter_valor_dominio(136,a.ie_motivo_prescricao),1,60) ds_motivo_prescr,
                    r.DS_RESUMO
                FROM prescr_medica a, 
                prescr_medica_resumo r
                WHERE a.NR_PRESCRICAO = r.NR_PRESCRICAO(+)
                AND a.DT_LIBERACAO <= nvl(r.DT_ATUALIZACAO, SYSDATE)
                AND a.nr_atendimento = '{nr_atendimento}'
                order by a.nr_prescricao
            '''

            cursor.execute(prescricoes)
            rows = self.dictfetchall(cursor)

            for row in rows:
                if not bool(row['DS_RESUMO']):
                    # executar a geração do resumo da prescrição
                    html = cursor.callproc('Executar_REP_Gerar_Resumo_PCK', [
                        row['NR_PRESCRICAO'],
                        'RTF',
                        'APPUDI',
                    ])

            cursor.execute(prescricoes)
            rows = self.dictfetchall(cursor)
            return Response(rows, status.HTTP_200_OK)


class BuscarPrescricao(RetrieveAPIView):
    queryset = UserManager
    permission_classes = [IsAuthenticated]

    def dictfetchall(self, cursor):
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        nr_atendimento = request.query_params.get('nr_atendimento', None)
        nr_prescricao = request.query_params.get('nr_prescricao', None)

        with connections['udi'].cursor() as cursor:
            # executar a geração do resumo da prescrição
            html = cursor.callproc('Executar_REP_Gerar_Resumo_PCK', [
                nr_prescricao,
                'html',
                'APPUDI',
            ])
            # realizar a consulta da prescrição
            prescricao = f'''
                SELECT 	a.NR_PRESCRICAO,
                    a.CD_PESSOA_FISICA,
                    a.NR_ATENDIMENTO,
                    a.DT_PRESCRICAO,
                    a.DT_LIBERACAO,
                    a.DT_VALIDADE_PRESCR,
                    a.NR_HORAS_VALIDADE,
                    a.DS_JUSTIFICATIVA,
                    a.DT_SUSPENSAO,
                    nvl(a.dt_liberacao,a.dt_liberacao_medico) dt_liberacao_prescr,
                    substr(obter_nome_medico(a.cd_medico,'N'),1,150) nm_medico,   
                    --substr(obter_desc_protocolo(cd_protocolo),1,255)desc_protocolo,
                    --substr(obter_desc_protocolo_medic(nr_seq_protocolo,cd_protocolo),1,50)ds_medic_protocolo,
                    substr(obter_valor_dominio(9,a.ie_origem_inf),1,100) ds_origem_inf, 
                    to_number(obter_cirurgia_prescricao(a.nr_prescricao)) nr_cirurgia_grid,
                    substr(obter_funcao_usuario_orig(a.nm_usuario_original),1,240) ds_funcao_prescritor,
                    substr(obter_itens_prescr(a.nr_prescricao, a.ds_itens_prescr),1,255) ds_item, 
                    substr(a.ds_observacao,1,255) ds_observacao_grid,
                    substr(obter_valor_dominio(136,a.ie_motivo_prescricao),1,60) ds_motivo_prescr,
                    r.DS_RESUMO
                FROM prescr_medica a, 
                prescr_medica_resumo r
                WHERE a.NR_PRESCRICAO = r.NR_PRESCRICAO(+)
                AND a.DT_LIBERACAO <= nvl(r.DT_ATUALIZACAO, SYSDATE)
                and a.nr_prescricao = '{nr_prescricao}'
                AND a.nr_atendimento = '{nr_atendimento}'
                order by a.nr_prescricao
            '''

            cursor.execute(prescricao)
            prescricao = self.dictfetchall(cursor)
            return Response(prescricao, status.HTTP_200_OK)
