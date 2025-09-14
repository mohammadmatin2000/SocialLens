from rest_framework import serializers
from .models import FacebookProfile, FacebookPost

# ======================================================================================================================
class FacebookProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacebookProfile
        fields = [
            'id',
            'name',
            'followers_count',
            'total_likes',
            'total_views',
            'total_comments',
            'total_shares',
            'total_saves',
            'created_date',
            'updated_date',
        ]


# ======================================================================================================================
class FacebookPostSerializer(serializers.ModelSerializer):
    profile = FacebookProfileSerializer(read_only=True)

    class Meta:
        model = FacebookPost
        fields = [
            'id',
            'profile',
            'campaign',
            'status',
            'content',
            'platforms',
            'tags',
            'created_date',
            'updated_date',
        ]
# ======================================================================================================================