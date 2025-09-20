from rest_framework import serializers
from .models import InstagramProfile, InstagramPost, Engagement
# ======================================================================================================================
class InstagramProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramProfile
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
class InstagramPostSerializer(serializers.ModelSerializer):
    profile = InstagramProfileSerializer(read_only=True)

    class Meta:
        model = InstagramPost
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
class InstagramEngagementSerializer(serializers.ModelSerializer):
    post = InstagramPostSerializer(read_only=True)

    class Meta:
        model = Engagement
        fields = [
            'id',
            'post',
            'user',
            'type',
            'content',
            'created_date',
        ]
# ======================================================================================================================
class InstagramAnalyticsSerializer(serializers.ModelSerializer):
    total_followers = serializers.IntegerField(source='followers_count',read_only=True)
    total_likes = serializers.IntegerField(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)
    total_shares = serializers.IntegerField(read_only=True)
    total_saves = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)

    class Meta:
        model = InstagramProfile
        fields = [
            'id', 'username',
            'total_followers', 'total_likes', 'total_comments', 'total_shares', 'total_saves', 'total_views'
        ]
# ======================================================================================================================