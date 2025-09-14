from django.contrib import admin
from .models import TwitterPostModels, TwitterProfileModels

# ======================================================================================================================
@admin.register(TwitterProfileModels)
class TwitterProfileAdmin(admin.ModelAdmin):
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
@admin.register(TwitterPostModels)
class TwitterPostAdmin(admin.ModelAdmin):
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