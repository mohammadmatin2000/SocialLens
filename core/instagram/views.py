from rest_framework import viewsets
from .models import InstagramProfile, InstagramPost
from .serializers import InstagramProfileSerializer, InstagramPostSerializer
# ======================================================================================================================
class InstagramProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InstagramProfile.objects.all()
    serializer_class = InstagramProfileSerializer
# ======================================================================================================================
class InstagramPostViewSet(viewsets.ModelViewSet):
    queryset = InstagramPost.objects.all()
    serializer_class = InstagramPostSerializer
# ======================================================================================================================
