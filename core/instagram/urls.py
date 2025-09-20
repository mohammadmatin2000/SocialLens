from rest_framework.routers import DefaultRouter
from .views import InstagramProfileViewSet, InstagramPostViewSet,EngagementViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', InstagramProfileViewSet, basename='profile')
router.register(r'posts', InstagramPostViewSet, basename='post')
router.register(r'engagements', EngagementViewSet, basename='engagement')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================