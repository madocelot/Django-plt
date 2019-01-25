# serializers.py

from rest_framework import serializers
from .models import Sale, Worker

class crtSerializer(serializers.ModelSerializer):
    class Meta:
            model = Sale
            fields = ('year', 'worker', 'revenue')
