from rest_framework import serializers
from .models import YouTubeChannelModel, YouTubeVideoModel,YouTubeEngagement
# ======================================================================================================================
class YouTubeChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubeChannelModel
        fields = [
            'id',
            'name',
            'subscribers_count',
            'total_likes',
            'total_views',
            'total_comments',
            'total_shares',
            'created_date',
            'updated_date',
        ]
# ======================================================================================================================
class YouTubeVideoSerializer(serializers.ModelSerializer):
    channel = YouTubeChannelSerializer(read_only=True)

    class Meta:
        model = YouTubeVideoModel
        fields = [
            'id',
            'channel',
            'campaign',
            'status',
            'title',
            'description',
            'platforms',
            'tags',
            'created_date',
            'updated_date',
        ]
# ======================================================================================================================
class YouTubeEngagementSerializer(serializers.ModelSerializer):
    video = YouTubeVideoSerializer(read_only=True)
    class Meta:
        model = YouTubeEngagement
        fields = [
            'id',
            'video',
            'user',
            'type',
            'content',
            'created_date',
        ]
# ======================================================================================================================
class YouTubeAnalyticsSerializer(serializers.ModelSerializer):
    total_subscribers = serializers.IntegerField(source='subscribers_count', read_only=True)
    total_likes = serializers.IntegerField(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)
    total_shares = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)

    class Meta:
        model = YouTubeChannelModel
        fields = [
            'id', 'name',
            'total_subscribers', 'total_likes', 'total_comments',
            'total_shares', 'total_views'
        ]
# ======================================================================================================================