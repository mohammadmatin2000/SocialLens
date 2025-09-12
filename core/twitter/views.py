from rest_framework.views import APIView
from rest_framework.response import Response
import random
# ======================================================================================================================
class TwitterAPIView(APIView):
    def get(self, request):
        # دیتای الکی (تستی) برمی‌گردونیم
        data = {
            "followers_count": random.randint(1000, 50000),
            "total_likes_last_posts": random.randint(100, 10000),
            "total_views_last_posts": random.randint(500, 50000),
        }
        return Response(data)
# ======================================================================================================================