from django.urls import path
from .views import ListarLaudos

urlpatterns = [
    path(r'lista/<int:cd_pessoa_fisica>/', ListarLaudos.as_view())
]
