from django.db import connections
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.views import obtain_jwt_token

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import (
    JSONWebTokenSerializer, RefreshJSONWebTokenSerializer,
    VerifyJSONWebTokenSerializer
)

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class JSONWebTokenAPIView(APIView):
    """
    Base API View that various JWT interactions inherit from.
    """
    permission_classes = ()
    authentication_classes = ()

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'view': self,
        }

    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.
        You may want to override this if you need to provide different
        serializations depending on the incoming request.
        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__)
        return self.serializer_class

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def dictfetchall(self, cursor):
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def obterUsuarioTasy(self, username):
        try:
            with connections['udi'].cursor() as cursor:
                query = f'''
                    SELECT 
                        u.NM_USUARIO,
                        u.DS_USUARIO,
                        u.CD_PESSOA_FISICA,
                        u.CD_FUNCAO,
                        u.IE_PROFISSIONAL,
                        u.DS_LOGIN,
                        m.NR_CRM,
                        OBTER_NOME_PESSOA_FISICA(u.CD_PESSOA_FISICA, '') nm_pessoa_fisica,
                        m.NM_GUERRA,
                        m.UF_CRM
                    FROM USUARIO u, MEDICO m
                    where	((upper(u.nm_usuario)	= upper('{username}')) OR (upper(u.DS_LOGIN) = upper('{username}')))
                    AND u.CD_PESSOA_FISICA = m.CD_PESSOA_FISICA(+)
                    -- LIMIT 1
                '''
                cursor.execute(query)
                usuario_tasy = self.dictfetchall(cursor)
                return usuario_tasy
        except Exception as error:
            raise error

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.object.get('user') or request.user
            usuario_tasy = self.obterUsuarioTasy(user.username)
            if not bool(usuario_tasy):
                return Response({'error': f'Usuário {user.username} não localizado. Seu usuário não está cadastrado no Tasy.'}, status.HTTP_404_NOT_FOUND)

            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            response_data['usuario_tasy'] = usuario_tasy[0]
            response = Response(response_data)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)
            return response
        except Exception as error:
            return Response({'error': error.__str__()}, status=status.HTTP_400_BAD_REQUEST)


class ObtainJSONWebToken(JSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = JSONWebTokenSerializer


class VerifyJSONWebToken(JSONWebTokenAPIView):
    """
    API View that checks the veracity of a token, returning the token if it
    is valid.
    """
    serializer_class = VerifyJSONWebTokenSerializer


class RefreshJSONWebToken(JSONWebTokenAPIView):
    """
    API View that returns a refreshed token (with new expiration) based on
    existing token

    If 'orig_iat' field (original issued-at-time) is found, will first check
    if it's within expiration window, then copy it to the new token
    """
    serializer_class = RefreshJSONWebTokenSerializer


obtain_jwt_token = ObtainJSONWebToken.as_view()
refresh_jwt_token = RefreshJSONWebToken.as_view()
verify_jwt_token = VerifyJSONWebToken.as_view()
