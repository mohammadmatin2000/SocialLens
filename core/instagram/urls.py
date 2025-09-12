from django.urls import path
from .views import InstagramAPIView
# ======================================================================================================================
urlpatterns = [
    path('instagram-profile/<str:username>/', InstagramAPIView.as_view(), name='instagram-profile'),
]
# ======================================================================================================================