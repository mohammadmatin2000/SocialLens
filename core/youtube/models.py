from django.db import models
from django.utils import timezone

# ======================================================================================================================
class YouTubeChannelModel(models.Model):
    # نام کانال
    name = models.CharField(max_length=255, verbose_name="نام کانال")

    # آمار کلی
    subscribers_count = models.IntegerField(default=0, verbose_name="تعداد سابسکرایبرها")
    total_likes = models.IntegerField(default=0, verbose_name="مجموع لایک‌ها")
    total_views = models.IntegerField(default=0, verbose_name="مجموع بازدیدها")
    total_comments = models.IntegerField(default=0, verbose_name="تعداد کامنت‌ها")
    total_shares = models.IntegerField(default=0, verbose_name="تعداد شیر/بازنشر")

    created_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return self.name


# ======================================================================================================================
class YouTubeVideoModel(models.Model):
    STATUS_CHOICES = [
        ('draft', 'پیش‌نویس'),
        ('scheduled', 'زمان‌بندی‌شده'),
        ('published', 'منتشر شده'),
        ('failed', 'ناموفق'),
    ]

    channel = models.ForeignKey(YouTubeChannelModel, on_delete=models.CASCADE, related_name='videos', verbose_name="کانال")
    campaign = models.CharField(max_length=255, verbose_name="کمپین", default="بدون نام")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', verbose_name="وضعیت")
    title = models.CharField(max_length=255, verbose_name="عنوان ویدیو", default="بدون عنوان")
    description = models.TextField(verbose_name="توضیحات ویدیو", default="بدون محتوا")
    platforms = models.JSONField(default=list, verbose_name="پلتفرم‌ها")
    tags = models.JSONField(default=list, verbose_name="تگ‌ها")

    created_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ایجاد")
    updated_date = models.DateTimeField(default=timezone.now, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.channel.name} - {self.title}"
# ======================================================================================================================