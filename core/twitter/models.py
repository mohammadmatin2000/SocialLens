from django.db import models
from django.utils import timezone
# ======================================================================================================================
class TwitterProfileModels(models.Model):
    # نام کاربری
    username = models.CharField(max_length=255, verbose_name="نام کاربری")

    # آمار کلی
    followers_count = models.IntegerField(default=0, verbose_name="تعداد فالوورها")
    total_likes = models.IntegerField(default=0, verbose_name="مجموع لایک‌ها")
    total_views = models.IntegerField(default=0, verbose_name="مجموع بازدیدها")
    total_comments = models.IntegerField(default=0, verbose_name="تعداد کامنت‌ها")
    total_shares = models.IntegerField(default=0, verbose_name="تعداد شیر/بازنشر")
    total_saves = models.IntegerField(default=0, verbose_name="تعداد سیو/ذخیره")

    created_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return self.username


# ======================================================================================================================
class TwitterPostModels(models.Model):
    STATUS_CHOICES = [
        ('draft', 'پیش‌نویس'),
        ('scheduled', 'زمان‌بندی‌شده'),
        ('published', 'منتشر شده'),
        ('failed', 'ناموفق'),
    ]

    profile = models.ForeignKey(TwitterProfileModels, on_delete=models.CASCADE, related_name='posts', verbose_name="پروفایل")
    campaign = models.CharField(max_length=255, verbose_name="کمپین", default="بدون نام")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', verbose_name="وضعیت")
    content = models.TextField(verbose_name="متن پست", default="بدون محتوا")
    platforms = models.JSONField(default=list, verbose_name="پلتفرم‌ها")
    tags = models.JSONField(default=list, verbose_name="تگ‌ها")

    created_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.profile.username} - {self.campaign}"
# ======================================================================================================================