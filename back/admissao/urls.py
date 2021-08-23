from django.urls import path
from .views.lista_pacientes_tasy import (
    ListarSetoresInternacao,
    ListarPacientesSetor
)
from .views.salvar_plano_terapeutico import (
    SalvarPlanoTerapeutico
)

from .views.render_report import Pdf


urlpatterns = [
    path(r'lista-setores/', ListarSetoresInternacao.as_view()),
    path(r'lista-pacientes-setor/', ListarPacientesSetor.as_view()),
    path(r'salvar-round-uti-paciente/',
         SalvarPlanoTerapeutico.as_view()),

    path('render/pdf/', Pdf.as_view())

]
