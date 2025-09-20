from rest_framework import viewsets
from rest_framework.views import APIView,Response
from .models import YouTubeChannelModel, YouTubeVideoModel,YouTubeEngagement
from .serializers import YouTubeChannelSerializer, YouTubeVideoSerializer,YouTubeEngagementSerializer,YouTubeAnalyticsSerializer
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
PLATFORM_COEFFICIENT = 1.0
class YouTubeAnalyticsView(APIView):
    def get(self, request):
        channels = YouTubeChannelModel.objects.all()
        data = YouTubeAnalyticsSerializer(channels, many=True).data

        for c in data:
            # رشد سابسکرایبر تخمینی
            c['estimated_growth'] = round(c['total_subscribers'] * 0.01, 0)

            # محاسبه نرخ تعامل تخمینی
            total_engagements = (
                c['total_likes'] +
                c['total_comments'] +
                c['total_shares'] +
                c['total_views'] * 0.05  # ویو ضریب کمتر دارد
            )
            c['engagement_rate'] = round(
                (total_engagements / max(c['total_subscribers'], 1)) * 100 * PLATFORM_COEFFICIENT,
                2
            )

        return Response(data)
# ======================================================================================================================