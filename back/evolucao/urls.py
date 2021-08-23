from django.urls import path
from .views import ListarEvolucoes

urlpatterns = [
    path(r'lista/<int:nr_atendimento>/', ListarEvolucoes.as_view())
]
