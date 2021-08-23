from typing import DefaultDict
from django.db import models
from django.contrib.postgres.fields import JSONField
# Create your models here.


class PlanoTerapeutico(models.Model):
    nr_atendimento = models.CharField(max_length=10)
    ds_evolucao = models.TextField()
    cd_evolucao = models.CharField(max_length=10)
    ie_tipo_evolucao = models.CharField(max_length=10)
    cd_pessoa_fisica = models.CharField(max_length=10)
    nm_usuario = models.CharField(max_length=10)
    cd_medico = models.CharField(max_length=10)
    ie_evolucao_clinica = models.CharField(max_length=10)
    round = JSONField(null=False, default=dict)
    bl_ativo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'plano_terapeutico'
