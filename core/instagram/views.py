from rest_framework.views import APIView
from rest_framework.response import Response
import instaloader

MAX_POSTS = 50  # تعداد آخرین پست‌ها برای محاسبه لایک و ویو


class InstagramAPIView(APIView):
    def get(self, request, username):
        try:
            L = instaloader.Instaloader(download_pictures=False, download_videos=False,
                                        download_video_thumbnails=False, download_comments=False,
                                        save_metadata=False, compress_json=False)

            # ------------------ گرفتن پروفایل بدون login ------------------
            profile = instaloader.Profile.from_username(L.context, username)

            total_likes = 0
            total_views = 0

            for i, post in enumerate(profile.get_posts()):
                if i >= MAX_POSTS:
                    break
                total_likes += post.likes
                if post.is_video:
                    total_views += post.video_view_count

            data = {
                "username": username,
                "followers_count": profile.followers,
                "total_likes_last_posts": total_likes,
                "total_views_last_posts": total_views
            }

            return Response(data)

        except instaloader.exceptions.ProfileNotExistsException:
            return Response({"error": "Profile not found"}, status=404)
        except instaloader.exceptions.PrivateProfileNotFollowedException:
            return Response({"error": "Profile is private"}, status=403)
        except instaloader.exceptions.ConnectionException as e:
            return Response({"error": f"Connection error: {str(e)}"}, status=500)
        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)
