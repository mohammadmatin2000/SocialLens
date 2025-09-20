from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls.static import static
from django.conf import settings
# ======================================================================================================================
schema_view = get_schema_view(
    openapi.Info(
        title="Flower Shop API",
        default_version="v1",
        description="مستندات API مدیریت شبکه مجازی",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
# ======================================================================================================================
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('instagram/', include('instagram.urls')),
    path('facebook/', include('facebook.urls')),
    path('youtube/', include('youtube.urls')),
    path('twitter/', include('twitter.urls')),

    path("api-auth/", include("rest_framework.urls")),

    path(
        "swagger.<format>/",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),


    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),


    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]
# ======================================================================================================================
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# ======================================================================================================================