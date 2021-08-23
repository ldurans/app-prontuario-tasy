# Generated by Django 2.1 on 2019-10-30 15:33

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PlanoTerapeutico',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nr_atendimento', models.CharField(max_length=10)),
                ('ds_evolucao', models.TextField()),
                ('cd_evolucao', models.CharField(max_length=10)),
                ('ie_tipo_evolucao', models.CharField(max_length=10)),
                ('cd_pessoa_fisica', models.CharField(max_length=10)),
                ('nm_usuario', models.CharField(max_length=10)),
                ('cd_medico', models.CharField(max_length=10)),
                ('ie_evolucao_clinica', models.CharField(max_length=10)),
                ('json_estado_form', django.contrib.postgres.fields.jsonb.JSONField()),
                ('bl_ativo', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'plano_terapeutico',
            },
        ),
    ]
