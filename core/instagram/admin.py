from django.contrib import admin
from .models import InstagramProfile
# ======================================================================================================================
@admin.register(InstagramProfile)
class InstagramProfileAdmin(admin.ModelAdmin):
    # فیلدهایی که در لیست اصلی ادمین نمایش داده می‌شوند
    list_display = ('username', 'total_likes', 'total_views', 'created_date','updated_date')

    # فیلدهایی که قابل جستجو در ادمین باشند
    search_fields = ('username',)

    # ترتیب نمایش رکوردها (جدیدترین آخرین بروزرسانی اول)
    ordering = ('-updated_date',)
# ======================================================================================================================