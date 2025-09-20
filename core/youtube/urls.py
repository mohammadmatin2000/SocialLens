from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import YouTubeChannelViewSet, YouTubeVideoViewSet,YouTubeEngagementViewSet,YouTubeAnalyticsView
# ======================================================================================================================
router = DefaultRouter()
router.register(r'channels', YouTubeChannelViewSet, basename='channel')
router.register(r'videos', YouTubeVideoViewSet, basename='video')
router.register(r'engagements', YouTubeEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = [
    path('', include(router.urls)),
    path('analyticsview/', YouTubeAnalyticsView.as_view(), name='instagram-dashboard'),
]
# ======================================================================================================================
