from django.db import models
# ======================================================================================================================
class InstagramProfile(models.Model):
    # نام کاربری اینستاگرام، مثل: 'mohammadmatin'
    username = models.CharField(max_length=255)

    # تعداد فالوورهای کاربر
    followers_count = models.IntegerField(default=0)

    # مجموع لایک‌های تمام پست‌ها
    total_likes = models.IntegerField(default=0)

    # مجموع بازدیدهای ویدیوها (views)
    total_views = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

# ======================================================================================================================