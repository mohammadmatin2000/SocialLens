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