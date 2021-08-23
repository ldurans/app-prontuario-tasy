from rest_framework import serializers
from .models import PlanoTerapeutico


class PlanoTerapeuticoSerializer(serializers.ModelSerializer):
    round = serializers.JSONField()

    class Meta:
        model = PlanoTerapeutico
        fields = '__all__'
