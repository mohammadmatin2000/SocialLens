from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FacebookProfileViewSet, FacebookPostViewSet,FacebookEngagementViewSet,FacebookAnalyticsView
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', FacebookProfileViewSet, basename='profile')
router.register(r'posts', FacebookPostViewSet, basename='post')
router.register(r'engagements', FacebookEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = [
    path('', include(router.urls)),
    path('AnalyticsView/', FacebookAnalyticsView.as_view(), name='instagram-dashboard'),
]
# ======================================================================================================================