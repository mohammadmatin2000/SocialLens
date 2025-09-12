from rest_framework import serializers
from .models import InstagramProfile
# ======================================================================================================================
class InstagramProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramProfile
        fields = ['username', 'followers_count', 'media_count', 'created_date', 'updated_date']
# ======================================================================================================================