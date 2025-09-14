from rest_framework.routers import DefaultRouter
from .views import YouTubeChannelViewSet, YouTubeVideoViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'channels', YouTubeChannelViewSet, basename='channel')
router.register(r'videos', YouTubeVideoViewSet, basename='video')
# ======================================================================================================================
urlpatterns = router.urls
