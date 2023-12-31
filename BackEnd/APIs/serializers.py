from .models import Users
from rest_framework import serializers

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}