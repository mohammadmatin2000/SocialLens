from django.contrib import admin
from .models import YouTubeChannelModel, YouTubeVideoModel, YouTubeEngagement

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
@admin.register(YouTubeEngagement)
class YouTubeEngagementAdmin(admin.ModelAdmin):
    list_display = ('video', 'user', 'type', 'content', 'created_date')
    list_filter = ('type',)
    search_fields = ('user', 'video__title', 'content')
    ordering = ('-created_date',)
# ======================================================================================================================