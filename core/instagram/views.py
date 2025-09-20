from rest_framework import viewsets
from rest_framework.views import APIView,Response
from .models import InstagramProfile, InstagramPost, Engagement
from .serializers import InstagramProfileSerializer, InstagramPostSerializer, InstagramEngagementSerializer,InstagramAnalyticsSerializer

# ======================================================================================================================
class InstagramProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InstagramProfile.objects.all()
    serializer_class = InstagramProfileSerializer
# ======================================================================================================================
class InstagramPostViewSet(viewsets.ModelViewSet):
    queryset = InstagramPost.objects.all()
    serializer_class = InstagramPostSerializer
# ======================================================================================================================
class EngagementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Engagement.objects.select_related("post", "post__profile").all().order_by("-created_date")
    serializer_class = InstagramEngagementSerializer
# ======================================================================================================================
PLATFORM_COEFFICIENT = 1.0
class InstagramAnalyticsView(APIView):
    def get(self, request):
        profiles = InstagramProfile.objects.all()
        data = InstagramAnalyticsSerializer(profiles, many=True).data

        for p in data:
            # رشد فالوئر تخمینی روزانه (مثلاً 1٪)
            p['estimated_growth'] = round(p['total_followers'] * 0.01, 0)

            # نرخ تعامل تخمینی
            total_engagements = (
                p['total_likes'] +
                p['total_comments'] +
                p['total_shares'] +
                p['total_saves'] +
                p['total_views'] * 0.1  # ویو ضریب کمتر
            )
            p['engagement_rate'] = round(
                (total_engagements / max(p['total_followers'], 1)) * 100 * PLATFORM_COEFFICIENT,
                2
            )

        return Response(data)
# ======================================================================================================================