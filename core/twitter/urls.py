from rest_framework.routers import DefaultRouter
from .views import TwitterProfileViewSet, TwitterPostViewSet,TwitterEngagementViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', TwitterProfileViewSet, basename='profile')
router.register(r'posts', TwitterPostViewSet, basename='post')
router.register(r'engagements', TwitterEngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================