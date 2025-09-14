from rest_framework import viewsets
from .models import TwitterProfileModels, TwitterPostModels
from .serializers import TwitterProfileSerializer, TwitterPostSerializer
# ======================================================================================================================
class TwitterProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TwitterProfileModels.objects.all()
    serializer_class = TwitterProfileSerializer
# ======================================================================================================================
class TwitterPostViewSet(viewsets.ModelViewSet):
    queryset = TwitterPostModels.objects.all()
    serializer_class = TwitterPostSerializer
# ======================================================================================================================
