from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()
