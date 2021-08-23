from django.db import connections
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import UserManager
from ..models import PlanoTerapeutico
from ..serializers import PlanoTerapeuticoSerializer
from decouple import config


class SalvarPlanoTerapeutico (CreateAPIView):
    queryset = PlanoTerapeutico
    serializer_class = PlanoTerapeuticoSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        data = request.data
        with connections['udi'].cursor() as cursor:
            NR_ATENDIMENTO_P = data['NR_ATENDIMENTO']
            ROUND_P = data['round']
            IE_TIPO_EVOLUCAO_P = config('IE_TIPO_EVOLUCAO_P', default='1')
            CD_PESSOA_FISICA_P = data['CD_PESSOA_FISICA']
            NM_USUARIO_P = data['nm_usuario']
            DS_EVOLUCAO_P = data['evolucao']
            DS_PLANO_P = data['planoTerapeutico']
            CD_MEDICO_P = data['cd_medico']  # data.CD_MEDICO
            IE_EVOLUCAO_CLINICA_P = config(
                'IE_EVOLUCAO_CLINICA_P',
                default='RA'
            )
            evolucao_criada = int()

            try:
                resultado = cursor.callproc('udi_inserir_evolucao_paciente', [
                    NR_ATENDIMENTO_P,
                    IE_TIPO_EVOLUCAO_P,
                    CD_PESSOA_FISICA_P,
                    NM_USUARIO_P,
                    DS_EVOLUCAO_P,
                    DS_PLANO_P,
                    CD_MEDICO_P,
                    IE_EVOLUCAO_CLINICA_P,
                    evolucao_criada
                ])
                evolucao_criada = resultado[8]

                data = {
                    'nr_atendimento': NR_ATENDIMENTO_P,
                    'ds_evolucao': DS_EVOLUCAO_P,
                    'cd_evolucao': evolucao_criada,
                    'ie_tipo_evolucao': IE_TIPO_EVOLUCAO_P,
                    'cd_pessoa_fisica': CD_PESSOA_FISICA_P,
                    'nm_usuario': NM_USUARIO_P,
                    'cd_medico': CD_MEDICO_P,
                    'round': ROUND_P,
                    'ie_evolucao_clinica': IE_EVOLUCAO_CLINICA_P,
                    # json_estado_form:
                }

                serializer = self.serializer_class(data=data)

                # if NR_ATENDIMENTO_P:
                #     return Response(status.HTTP_400_BAD_REQUEST)

                if serializer.is_valid():
                    serializer.save()
                    return Response({'evolucao_tasy': evolucao_criada}, status.HTTP_200_OK)
                print('Não foi possível criar evolução do PG')
                print(serializer.errors)
                return Response({'evolucao_tasy': evolucao_criada}, status.HTTP_200_OK)
            except Exception as err:
                return Response({'error': str(err)}, status.HTTP_400_BAD_REQUEST)
