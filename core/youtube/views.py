from rest_framework import viewsets
from .models import YouTubeChannelModel, YouTubeVideoModel,YouTubeEngagement
from .serializers import YouTubeChannelSerializer, YouTubeVideoSerializer,YouTubeEngagementSerializer

# ======================================================================================================================
class YouTubeChannelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YouTubeChannelModel.objects.all()
    serializer_class = YouTubeChannelSerializer
# ======================================================================================================================
class YouTubeVideoViewSet(viewsets.ModelViewSet):
    queryset = YouTubeVideoModel.objects.all()
    serializer_class = YouTubeVideoSerializer
# ======================================================================================================================
class YouTubeEngagementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YouTubeEngagement.objects.all().select_related('video', 'video__channel')
    serializer_class = YouTubeEngagementSerializer
# ======================================================================================================================