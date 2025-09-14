from django.contrib import admin
from .models import InstagramProfile, InstagramPost

# ======================================================================================================================
@admin.register(InstagramProfile)
class InstagramProfileAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'followers_count',
        'total_likes',
        'total_views',
        'total_comments',
        'total_shares',
        'total_saves',
        'created_date',
        'updated_date',
    )
    search_fields = ('username',)
    ordering = ('-created_date',)


# ======================================================================================================================
@admin.register(InstagramPost)
class InstagramPostAdmin(admin.ModelAdmin):
    list_display = (
        'profile',
        'campaign',
        'status',
        'created_date',
        'updated_date',
    )
    list_filter = ('status', 'platforms')
    search_fields = ('profile__username', 'campaign', 'content', 'tags')
    ordering = ('-created_date',)
# ======================================================================================================================