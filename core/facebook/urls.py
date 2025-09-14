from rest_framework.routers import DefaultRouter
from .views import FacebookProfileViewSet, FacebookPostViewSet
# ======================================================================================================================
router = DefaultRouter()
router.register(r'profiles', FacebookProfileViewSet, basename='profile')
router.register(r'posts', FacebookPostViewSet, basename='post')
# ======================================================================================================================
urlpatterns = router.urls
# ======================================================================================================================