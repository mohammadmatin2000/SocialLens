from rest_framework.routers import DefaultRouter
from .views import FacebookProfileViewSet, FacebookPostViewSet,FacebookEngagementViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', FacebookProfileViewSet, basename='profile')
router.register(r'posts', FacebookPostViewSet, basename='post')
router.register(r'engagements', FacebookEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================