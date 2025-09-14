from rest_framework import viewsets
from .models import FacebookProfile, FacebookPost
from .serializers import FacebookProfileSerializer, FacebookPostSerializer
# ======================================================================================================================
class FacebookProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacebookProfile.objects.all()
    serializer_class = FacebookProfileSerializer
# ======================================================================================================================
class FacebookPostViewSet(viewsets.ModelViewSet):
    queryset = FacebookPost.objects.all()
    serializer_class = FacebookPostSerializer
# ======================================================================================================================