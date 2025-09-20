from rest_framework import viewsets
from .models import TwitterProfileModels, TwitterPostModels,TwitterEngagement
from .serializers import TwitterProfileSerializer, TwitterPostSerializer,TwitterEngagementSerializer
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