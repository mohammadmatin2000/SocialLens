"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Edit, Trash2, Calendar} from "lucide-react";
import {useRouter} from "next/navigation";

type Platform = "Facebook" | "Instagram" | "Twitter" | "YouTube";
type PostStatus = "draft" | "scheduled" | "published" | "failed";

type Post = {
    id: string;
    content: string;
    platforms: Platform[];
    scheduledAt: string;
    status: PostStatus;
    tags: string[];
    campaign?: string;
};

const API_BASE = "http://127.0.0.1:8000";

const PLATFORM_NAMES_FA: Record<Platform, string> = {
    Facebook: "فیسبوک",
    Instagram: "اینستاگرام",
    Twitter: "توییتر",
    YouTube: "یوتیوب",
};

export function PostsSection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ================= API Helpers =================
    const fetchPostsFromPlatform = async (platform: Platform) => {
        const endpoint = platform === "YouTube" ? "videos" : "posts";
        const res = await fetch(`${API_BASE}/${platform.toLowerCase()}/${endpoint}/`);
        if (!res.ok) throw new Error(`خطا در دریافت پست‌ها از ${platform}`);
        const data = await res.json();
        return data.map((p: any) => ({
            id: `${platform}-${p.id}`,
            content: p.content || "بدون متن",
            platforms: [platform],
            scheduledAt: p.created_date || new Date().toISOString(),
            status: (p.status as PostStatus) || "draft",
            tags: p.tags || [],
            campaign: p.campaign || "بدون نام",
        }));
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const [fb, ig, tw, yt] = await Promise.all([
                fetchPostsFromPlatform("Facebook"),
                fetchPostsFromPlatform("Instagram"),
                fetchPostsFromPlatform("Twitter"),
                fetchPostsFromPlatform("YouTube"),
            ]);
            setPosts([...fb, ...ig, ...tw, ...yt]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (post: Post) => {
        if (!confirm("آیا مطمئن هستید؟")) return;
        const platform = post.platforms[0];
        const id = post.id.split("-")[1];
        const endpoint = platform === "YouTube" ? "videos" : "posts";
        const res = await fetch(`${API_BASE}/${platform.toLowerCase()}/${endpoint}/${id}/`, {method: "DELETE"});
        if (!res.ok) return alert("خطا در حذف پست!");
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // ================= Utils =================
    const translateStatus = (status: PostStatus) => {
        switch (status) {
            case "scheduled":
                return "زمان‌بندی شده";
            case "published":
                return "منتشر شده";
            case "failed":
                return "ناموفق";
            default:
                return "پیش‌نویس";
        }
    };

    const getPlatformColor = (platform: Platform) => {
        const colors: Record<Platform, string> = {
            Facebook: "#1877f2",
            Instagram: "#e4405f",
            Twitter: "#1da1f2",
            YouTube: "#ff0000",
        };
        return colors[platform] || "#6366f1";
    };

    const formatTags = (tags: string[]) => {
        return tags
            .join(",")
            .split(/[,#]/)
            .map(t => t.trim())
            .filter(t => t !== "");
    };

    // ================= Render =================
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold">مدیریت محتوا</h2>
                <Button onClick={() => router.push("/posts/new")} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4"/> ایجاد پست
                </Button>
            </div>

            {loading ? (
                <p>در حال بارگذاری پست‌ها...</p>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-2 items-center">
                                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                                            <span>{new Date(post.scheduledAt).toLocaleString("fa-IR")}</span>
                                        </div>
                                        <div className="text-sm font-medium">کمپین: {post.campaign}</div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                        post.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                                            post.status === "published" ? "bg-green-100 text-green-800" :
                                                post.status === "failed" ? "bg-red-100 text-red-800" :
                                                    "bg-gray-100 text-gray-800"
                                    }`}>{translateStatus(post.status)}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="p-3 bg-muted/50 rounded-lg">{post.content}</div>

                                <div className="flex gap-4 flex-wrap">
                                    {/* Platforms */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">پلتفرم‌ها</h4>
                                        {post.platforms.map((platform, i) => (
                                            <span key={`${post.id}-${platform}-${i}`}
                                                  className="text-xs px-2 py-1 rounded-full text-white mr-1"
                                                  style={{backgroundColor: getPlatformColor(platform)}}>
                        {PLATFORM_NAMES_FA[platform]}
                      </span>
                                        ))}
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">تگ‌ها</h4>
                                        {formatTags(post.tags).map((tag, i) => (
                                            <span key={`${post.id}-tag-${i}`}
                                                  className="text-xs px-2 py-1 rounded-full bg-secondary mr-2">
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-2 border-t pt-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.push(`/posts/${post.platforms[0]}/${post.id.split("-")[1]}/edit`)
                                        }
                                    >
                                        <Edit className="mr-2 h-4 w-4"/> ویرایش
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => deletePost(post)}>
                                        <Trash2 className="mr-2 h-4 w-4"/> حذف
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
