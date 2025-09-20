from rest_framework import viewsets
from .models import FacebookProfile, FacebookPost, FacebookEngagement
from .serializers import FacebookProfileSerializer, FacebookPostSerializer, FacebookEngagementSerializer
# ======================================================================================================================
# Facebook Profile
class FacebookProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacebookProfile.objects.all().order_by('-created_date')
    serializer_class = FacebookProfileSerializer
# ======================================================================================================================
# Facebook Post
class FacebookPostViewSet(viewsets.ModelViewSet):
    queryset = FacebookPost.objects.all().order_by('-created_date')
    serializer_class = FacebookPostSerializer
# ======================================================================================================================
# Facebook Engagement
class FacebookEngagementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacebookEngagement.objects.select_related('post', 'post__profile').all().order_by('-created_date')
    serializer_class = FacebookEngagementSerializer
# ======================================================================================================================