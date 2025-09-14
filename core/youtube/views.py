from rest_framework import viewsets
from .models import YouTubeChannelModel, YouTubeVideoModel
from .serializers import YouTubeChannelSerializer, YouTubeVideoSerializer

# ======================================================================================================================
class YouTubeChannelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YouTubeChannelModel.objects.all()
    serializer_class = YouTubeChannelSerializer
# ======================================================================================================================
class YouTubeVideoViewSet(viewsets.ModelViewSet):
    queryset = YouTubeVideoModel.objects.all()
    serializer_class = YouTubeVideoSerializer
# ======================================================================================================================