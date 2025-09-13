from rest_framework.views import APIView
from rest_framework.response import Response
import random
# ======================================================================================================================
class YoutubeAPIView(APIView):
    def get(self, request):
        # دیتای الکی (تستی) برمی‌گردونیم
        data = {
            "followers_count": (4000,),
            "total_likes_last_posts": (200,),
            "total_views_last_posts": (600,),
        }
        return Response(data)
# ======================================================================================================================