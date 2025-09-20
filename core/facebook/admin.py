from django.contrib import admin
from .models import FacebookProfile, FacebookPost, FacebookEngagement

# ======================================================================================================================
@admin.register(FacebookProfile)
class FacebookProfileAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'followers_count',
        'total_likes',
        'total_views',
        'total_comments',
        'total_shares',
        'total_saves',
        'created_date',
        'updated_date',
    )
    search_fields = ('name',)
    ordering = ('-created_date',)

# ======================================================================================================================
@admin.register(FacebookPost)
class FacebookPostAdmin(admin.ModelAdmin):
    list_display = (
        'profile',
        'campaign',
        'status',
        'created_date',
        'updated_date',
    )
    list_filter = ('status', 'platforms')
    search_fields = ('profile__name', 'campaign', 'content', 'tags')
    ordering = ('-created_date',)

# ======================================================================================================================
@admin.register(FacebookEngagement)
class FacebookEngagementAdmin(admin.ModelAdmin):
    list_display = (
        'post',
        'user',
        'type',
        'content',
        'created_date',
    )
    list_filter = ('type', 'created_date')
    search_fields = ('user', 'post__content', 'content')
    ordering = ('-created_date',)
# ======================================================================================================================