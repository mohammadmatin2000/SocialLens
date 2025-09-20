from rest_framework import serializers
from .models import TwitterProfileModels, TwitterPostModels,TwitterEngagement

# ======================================================================================================================
class TwitterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitterProfileModels
        fields = [
            'id',
            'username',
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
class TwitterPostSerializer(serializers.ModelSerializer):
    profile = TwitterProfileSerializer(read_only=True)

    class Meta:
        model = TwitterPostModels
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
class TwitterEngagementSerializer(serializers.ModelSerializer):
    post = TwitterPostSerializer(read_only=True)

    class Meta:
        model = TwitterEngagement
        fields = [
            'id',
            'post',
            'user',
            'type',
            'content',
            'created_date',
        ]

# ======================================================================================================================