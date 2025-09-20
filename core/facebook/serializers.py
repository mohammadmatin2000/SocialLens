from rest_framework import serializers
from .models import FacebookProfile, FacebookPost, FacebookEngagement


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
class FacebookEngagementSerializer(serializers.ModelSerializer):
    post = FacebookPostSerializer(read_only=True)

    class Meta:
        model = FacebookEngagement
        fields = [
            'id',
            'post',
            'user',
            'type',
            'content',
            'created_date',
        ]
# ======================================================================================================================
class FacebookAnalyticsSerializer(serializers.ModelSerializer):
    total_followers = serializers.IntegerField(source='followers_count', read_only=True)
    total_likes = serializers.IntegerField(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)
    total_shares = serializers.IntegerField(read_only=True)
    total_saves = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)

    class Meta:
        model = FacebookProfile
        fields = [
            'id', 'name',
            'total_followers', 'total_likes', 'total_comments',
            'total_shares', 'total_saves', 'total_views'
        ]
# ======================================================================================================================
