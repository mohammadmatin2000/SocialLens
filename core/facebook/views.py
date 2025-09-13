from rest_framework.views import APIView
from rest_framework.response import Response
import random
# ======================================================================================================================
class FacebookAPIView(APIView):
    def get(self, request):
        # دیتای الکی (تستی) برمی‌گردونیم
        data = {
            "followers_count": (1000,),
            "total_likes_last_posts": (100,),
            "total_views_last_posts": (500,),
        }
        return Response(data)
# ======================================================================================================================