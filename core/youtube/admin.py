from django.contrib import admin
from .models import YouTubeChannelModel, YouTubeVideoModel

# ======================================================================================================================
@admin.register(YouTubeChannelModel)
class YouTubeChannelAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'subscribers_count',
        'total_likes',
        'total_views',
        'total_comments',
        'total_shares',
        'created_date',
        'updated_date',
    )
    search_fields = ('name',)
    ordering = ('-created_date',)


# ======================================================================================================================
@admin.register(YouTubeVideoModel)
class YouTubeVideoAdmin(admin.ModelAdmin):
    list_display = (
        'channel',
        'campaign',
        'status',
        'title',
        'created_date',
        'updated_date',
    )
    list_filter = ('status', 'platforms')
    search_fields = ('channel__name', 'campaign', 'title', 'tags', 'description')
    ordering = ('-created_date',)
# ======================================================================================================================