from rest_framework import viewsets
from .models import InstagramProfile, InstagramPost, Engagement
from .serializers import InstagramProfileSerializer, InstagramPostSerializer, EngagementSerializer

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
    serializer_class = EngagementSerializer
# ======================================================================================================================