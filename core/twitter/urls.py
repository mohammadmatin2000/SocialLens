from rest_framework.routers import DefaultRouter
from .views import TwitterProfileViewSet, TwitterPostViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', TwitterProfileViewSet, basename='profile')
router.register(r'posts', TwitterPostViewSet, basename='post')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================