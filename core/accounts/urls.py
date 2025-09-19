from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViews,
    RequestPasswordResetEmail,
    PasswordResetConfirmView,
    ActivateAccount,
    UserViewSet,
)
# ======================================================================================================================
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")
# ======================================================================================================================
urlpatterns = [
    path("register/", RegisterViews.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("password-reset/", RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("activate-account/", ActivateAccount.as_view(), name="activate-account"),

    path("", include(router.urls)),
]
# ======================================================================================================================