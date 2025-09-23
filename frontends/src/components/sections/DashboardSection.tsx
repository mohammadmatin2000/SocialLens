"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bar, Doughnut} from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import {
    TrendingUp,
    Users,
    Eye,
    MessageCircle,
    Heart,
    DollarSign,
    Target,
} from "lucide-react";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface PlatformData {
    followers: number;
    likes: number;
    views: number;
    posts: number;
    comments: number;
    shares: number;
    saves: number;
}

interface PostData {
    id: string | number;
    title: string;
    likes: number;
    platform: string;
}

interface DashboardSectionProps {
    onSelect?: (key: string) => void;
}

const API_BASE = "http://127.0.0.1:8000";

export function DashboardSection({onSelect}: DashboardSectionProps) {
    const [data, setData] = useState<{
        facebook: PlatformData;
        instagram: PlatformData;
        twitter: PlatformData;
        youtube: PlatformData;
    }>({
        facebook: {followers: 0, likes: 0, views: 0, posts: 0, comments: 0, shares: 0, saves: 0},
        instagram: {followers: 0, likes: 0, views: 0, posts: 0, comments: 0, shares: 0, saves: 0},
        twitter: {followers: 0, likes: 0, views: 0, posts: 0, comments: 0, shares: 0, saves: 0},
        youtube: {followers: 0, likes: 0, views: 0, posts: 0, comments: 0, shares: 0, saves: 0},
    });

    const [topPosts, setTopPosts] = useState<PostData[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSelect = (key: string) => onSelect?.(key);

    useEffect(() => {
        async function fetchData() {
            try {
                // پروفایل‌ها
                const [fbRes, igRes, twRes, ytRes] = await Promise.all([
                    fetch("http://127.0.0.1:8000/facebook/profiles/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/instagram/profiles/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/twitter/profiles/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/youtube/channels/").then(res => res.json()),
                ]);

                // پست‌ها
                const [fbPosts, igPosts, twPosts, ytVideos] = await Promise.all([
                    fetch("http://127.0.0.1:8000/facebook/posts/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/instagram/posts/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/twitter/posts/").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/youtube/videos/").then(res => res.json()),
                ]);

                // داده‌های کلی
                setData({
                    facebook: {
                        followers: fbRes[0]?.followers_count || 0,
                        likes: fbRes[0]?.total_likes || 0,
                        views: fbRes[0]?.total_views || 0,
                        posts: fbPosts.length,
                        comments: fbRes[0]?.total_comments || 0,
                        shares: fbRes[0]?.total_shares || 0,
                        saves: fbRes[0]?.total_saves || 0,
                    },
                    instagram: {
                        followers: igRes[0]?.followers_count || 0,
                        likes: igRes[0]?.total_likes || 0,
                        views: igRes[0]?.total_views || 0,
                        posts: igPosts.length,
                        comments: igRes[0]?.total_comments || 0,
                        shares: igRes[0]?.total_shares || 0,
                        saves: igRes[0]?.total_saves || 0,
                    },
                    twitter: {
                        followers: twRes[0]?.followers_count || 0,
                        likes: twRes[0]?.total_likes || 0,
                        views: twRes[0]?.total_views || 0,
                        posts: twPosts.length,
                        comments: twRes[0]?.total_comments || 0,
                        shares: twRes[0]?.total_shares || 0,
                        saves: twRes[0]?.total_saves || 0,
                    },
                    youtube: {
                        followers: ytRes[0]?.subscribers_count || 0,
                        likes: ytRes[0]?.total_likes || 0,
                        views: ytRes[0]?.total_views || 0,
                        posts: ytVideos.length,
                        comments: ytRes[0]?.total_comments || 0,
                        shares: ytRes[0]?.total_shares || 0,
                        saves: ytRes[0]?.total_saves || 0,
                    },
                });

                // بهترین پست‌ها
                const topPostsArr: PostData[] = [];

                function getBestPost(posts: any[], platform: string) {
                    if (!posts.length) return null;
                    const best = posts.reduce(
                        (best, p) => ((p.likes || 0) > (best.likes || 0) ? p : best),
                        {likes: 0}
                    );
                    return {
                        id: best.id || Math.random(),
                        title: best.content || best.title || "بدون متن",
                        likes: best.likes || 0,
                        platform,
                    };
                }

                const fbBest = getBestPost(fbPosts, "فیسبوک");
                const igBest = getBestPost(igPosts, "اینستاگرام");
                const twBest = getBestPost(twPosts, "توییتر");
                const ytBest = getBestPost(ytVideos, "یوتیوب");

                [fbBest, igBest, twBest, ytBest].forEach(p => p && topPostsArr.push(p));

                setTopPosts(topPostsArr);

            } catch (err) {
                console.error("خطا در واکشی داده‌ها:", err);
            }
        }

        fetchData();
    }, [refreshKey]);


    const totalFollowers = Object.values(data).reduce((sum, p) => sum + (p.followers || 0), 0);
    const totalLikes = Object.values(data).reduce((sum, p) => sum + (p.likes || 0), 0);
    const totalViews = Object.values(data).reduce((sum, p) => sum + (p.views || 0), 0);
    const totalComments = Object.values(data).reduce((sum, p) => sum + (p.comments || 0), 0);
    const totalShares = Object.values(data).reduce((sum, p) => sum + (p.shares || 0), 0);
    const totalSaves = Object.values(data).reduce((sum, p) => sum + (p.saves || 0), 0);

    const platformPostsData = {
        labels: ["فیسبوک", "اینستاگرام", "توییتر", "یوتیوب"],
        datasets: [
            {
                label: "تعداد پست‌ها",
                data: [data.facebook.posts, data.instagram.posts, data.twitter.posts, data.youtube.posts],
                backgroundColor: ["#1877f2", "#e4405f", "#1da1f2", "#ff0000"],
            },
        ],
    };

    const engagementData = {
        labels: ["لایک", "بازدید", "کامنت", "اشتراک‌گذاری", "ذخیره"],
        datasets: [
            {
                label: "تعامل",
                data: [totalLikes, totalViews, totalComments, totalShares, totalSaves],
                backgroundColor: ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"],
            },
        ],
    };

    const platformMetrics = [
        {platform: "فیسبوک", ...data.facebook, color: "#1877f2"},
        {platform: "اینستاگرام", ...data.instagram, color: "#e4405f"},
        {platform: "توییتر", ...data.twitter, color: "#1da1f2"},
        {platform: "یوتیوب", ...data.youtube, color: "#ff0000"},
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">داشبورد</h2>
                <Button size="sm" onClick={() => setRefreshKey(k => k + 1)}>بارگذاری مجدد</Button>
            </div>

            {/* کارت‌های کلیدی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium">مجموع دنبال‌کنندگان</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium">مجموع بازدیدها</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium">میزان تعامل</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm font-medium">بازده سرمایه (ROI)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">۳.۲ برابر</div>
                    </CardContent>
                </Card>
            </div>

            {/* نمودارها */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>پست‌ها بر اساس پلتفرم</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-72">
                            <Bar data={platformPostsData} options={{responsive: true, maintainAspectRatio: false}}/>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>ترکیب تعاملات</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-72">
                            <Doughnut data={engagementData} options={{responsive: true, maintainAspectRatio: false}}/>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* مرور عملکرد پلتفرم‌ها */}
            <Card>
                <CardHeader><CardTitle>مرور عملکرد پلتفرم‌ها</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {platformMetrics.map((p) => (
                            <div key={p.platform} className="p-4 border rounded-lg space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}/>
                                    <span className="font-semibold">{p.platform}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">دنبال‌کنندگان:</span><span
                                        className="font-medium">{p.followers.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">لایک‌ها:</span><span
                                        className="font-medium">{p.likes.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">بازدید:</span><span
                                        className="font-medium">{p.views.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">کامنت‌ها:</span><span
                                        className="font-medium">{p.comments.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">اشتراک‌گذاری‌ها:</span><span
                                        className="font-medium">{p.shares.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span
                                        className="text-muted-foreground">ذخیره‌ها:</span><span
                                        className="font-medium">{p.saves.toLocaleString()}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* برترین پست‌ها + اکشن‌های سریع */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>برترین پست‌ها</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topPosts.length === 0 &&
                                <div className="text-sm text-muted-foreground">پستی پیدا نشد</div>}
                            {topPosts.map((post) => (
                                <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"/>
                                        <div>
                                            <p className="font-medium text-sm">{post.title}</p>
                                            <p className="text-xs text-muted-foreground">{post.platform}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Heart className="h-3 w-3"/>
                                        {(post.likes || 0).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>اکشن‌های سریع</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => handleSelect("posts")}
                                    className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                                <MessageCircle className="h-6 w-6 mx-auto mb-2"/>
                                <span className="text-sm font-medium">ایجاد پست</span>
                            </button>
                            <button onClick={() => handleSelect("analytics")}
                                    className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                                <TrendingUp className="h-6 w-6 mx-auto mb-2"/>
                                <span className="text-sm font-medium">مشاهده آمار</span>
                            </button>
                            <button onClick={() => handleSelect("users")}
                                    className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                                <Users className="h-6 w-6 mx-auto mb-2"/>
                                <span className="text-sm font-medium">مدیریت کاربران</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
