from django.urls import path
from .views import ListarAvaliacoes

urlpatterns = [
    path(r'lista/<int:nr_atendimento>/', ListarAvaliacoes.as_view())
]
