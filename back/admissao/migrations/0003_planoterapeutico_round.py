# Generated by Django 2.1 on 2021-06-24 22:39

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admissao', '0002_remove_planoterapeutico_json_estado_form'),
    ]

    operations = [
        migrations.AddField(
            model_name='planoterapeutico',
            name='round',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}),
        ),
    ]