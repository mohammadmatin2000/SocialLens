from rest_framework import viewsets
from rest_framework.views import APIView,Response
from .models import FacebookProfile, FacebookPost, FacebookEngagement
from .serializers import FacebookProfileSerializer, FacebookPostSerializer, FacebookEngagementSerializer,FacebookAnalyticsSerializer
# ======================================================================================================================
class FacebookProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacebookProfile.objects.all().order_by('-created_date')
    serializer_class = FacebookProfileSerializer
# ======================================================================================================================
class FacebookPostViewSet(viewsets.ModelViewSet):
    queryset = FacebookPost.objects.all().order_by('-created_date')
    serializer_class = FacebookPostSerializer
# ======================================================================================================================
class FacebookEngagementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacebookEngagement.objects.select_related('post', 'post__profile').all().order_by('-created_date')
    serializer_class = FacebookEngagementSerializer
# ======================================================================================================================
PLATFORM_COEFFICIENT = 1.0
class FacebookAnalyticsView(APIView):
    def get(self, request):
        profiles = FacebookProfile.objects.all()
        data = FacebookAnalyticsSerializer(profiles, many=True).data

        for p in data:
            # رشد فالوئر تخمینی روزانه
            p['estimated_growth'] = round(p['total_followers'] * 0.01, 0)

            # محاسبه نرخ تعامل تخمینی
            total_engagements = (
                p['total_likes'] +
                p['total_comments'] +
                p['total_shares'] +
                p['total_saves'] +
                p['total_views'] * 0.1
            )
            p['engagement_rate'] = round(
                (total_engagements / max(p['total_followers'], 1)) * 100 * PLATFORM_COEFFICIENT,
                2
            )

        return Response(data)
# ======================================================================================================================