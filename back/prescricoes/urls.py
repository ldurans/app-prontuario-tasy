from django.urls import path
from .views import ListarPrescricoes, BuscarPrescricao

urlpatterns = [
    path(r'lista/<int:nr_atendimento>/', ListarPrescricoes.as_view()),
    path(r'buscar/<int:nr_atendimento>/<int:nr_prescricao>/',
         BuscarPrescricao.as_view())
]
