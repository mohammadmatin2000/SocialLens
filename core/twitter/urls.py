from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TwitterProfileViewSet, TwitterPostViewSet,TwitterEngagementViewSet,TwitterAnalyticsView
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', TwitterProfileViewSet, basename='profile')
router.register(r'posts', TwitterPostViewSet, basename='post')
router.register(r'engagements', TwitterEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = [
    path('', include(router.urls)),
    path('analyticsview/', TwitterAnalyticsView.as_view(), name='instagram-dashboard'),
]
# ======================================================================================================================