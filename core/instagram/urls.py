from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import InstagramProfileViewSet, InstagramPostViewSet, EngagementViewSet, InstagramAnalyticsView

# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', InstagramProfileViewSet, basename='profile')
router.register(r'posts', InstagramPostViewSet, basename='post')
router.register(r'engagements', EngagementViewSet, basename='engagement')

# ======================================================================================================================
urlpatterns = [
    path('', include(router.urls)),
    path('AnalyticsView/', InstagramAnalyticsView.as_view(), name='instagram-dashboard'),
]
# ======================================================================================================================