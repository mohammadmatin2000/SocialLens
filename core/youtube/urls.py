from rest_framework.routers import DefaultRouter
from .views import YouTubeChannelViewSet, YouTubeVideoViewSet,YouTubeEngagementViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'channels', YouTubeChannelViewSet, basename='channel')
router.register(r'videos', YouTubeVideoViewSet, basename='video')
router.register(r'engagements', YouTubeEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = router.urls
