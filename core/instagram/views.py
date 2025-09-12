from rest_framework.views import APIView
from rest_framework.response import Response
import random
# ======================================================================================================================
class InstagramAPIView(APIView):
    def get(self, request, username):
        # دیتای الکی (تستی) برمی‌گردونیم
        data = {
            "username": username,
            "followers_count": random.randint(1000, 50000),
            "total_likes_last_posts": random.randint(100, 10000),
            "total_views_last_posts": random.randint(500, 50000),
        }
        return Response(data)
# ======================================================================================================================