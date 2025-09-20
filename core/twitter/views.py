from rest_framework import viewsets
from rest_framework.views import APIView,Response
from .models import TwitterProfileModels, TwitterPostModels,TwitterEngagement
from .serializers import TwitterProfileSerializer, TwitterPostSerializer,TwitterEngagementSerializer,TwitterAnalyticsSerializer
# ======================================================================================================================
class TwitterProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TwitterProfileModels.objects.all()
    serializer_class = TwitterProfileSerializer
# ======================================================================================================================
class TwitterPostViewSet(viewsets.ModelViewSet):
    queryset = TwitterPostModels.objects.all()
    serializer_class = TwitterPostSerializer
# ======================================================================================================================
class TwitterEngagementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TwitterEngagement.objects.select_related("post", "post__profile").all().order_by("-created_date")
    serializer_class = TwitterEngagementSerializer
# ======================================================================================================================
PLATFORM_COEFFICIENT = 1.0
class TwitterAnalyticsView(APIView):
    def get(self, request):
        profiles = TwitterProfileModels.objects.all()
        data = TwitterAnalyticsSerializer(profiles, many=True).data

        for p in data:
            # رشد فالوئر تخمینی روزانه (مثلاً 1٪)
            p['estimated_growth'] = round(p['total_followers'] * 0.01, 0)

            # محاسبه نرخ تعامل تخمینی
            total_engagements = (
                p['total_likes'] +
                p['total_comments'] +
                p['total_shares'] +
                p['total_saves'] +
                p['total_views'] * 0.1  # ویو ضریب کمتر دارد
            )
            p['engagement_rate'] = round(
                (total_engagements / max(p['total_followers'], 1)) * 100 * PLATFORM_COEFFICIENT,
                2
            )

        return Response(data)
# ======================================================================================================================