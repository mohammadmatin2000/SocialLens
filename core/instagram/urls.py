from rest_framework.routers import DefaultRouter
from .views import InstagramProfileViewSet, InstagramPostViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', InstagramProfileViewSet, basename='profile')
router.register(r'posts', InstagramPostViewSet, basename='post')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================