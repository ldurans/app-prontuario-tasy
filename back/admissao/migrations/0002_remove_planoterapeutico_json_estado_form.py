# Generated by Django 2.1 on 2019-10-30 16:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admissao', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='planoterapeutico',
            name='json_estado_form',
        ),
    ]
