"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type Engagement = {
    id: number;
    type: string;
    user: string | object;
    post?: any;
    video?: any;
    created_date?: string;
    platform: "facebook" | "instagram" | "twitter" | "youtube";
};

// 🛠️ تابع کمکی برای نمایش متن پست
function getPostContent(e: any): string {
    if (!e) return "ندارد";

    if (e.post) {
        if (typeof e.post === "object") {
            return e.post.content ?? e.post.text ?? "ندارد";
        }
        return String(e.post);
    }

    if (e.video) {
        return e.video.description ?? e.video.title ?? "ندارد";
    }

    return "ندارد";
}

// 🛠️ تابع کمکی برای فارسی کردن نوع تعامل
function getTypeFa(type: string): string {
    switch (type.toLowerCase()) {
        case "like":
            return "لایک";
        case "comment":
            return "کامنت";
        case "save":
            return "ذخیره";
        default:
            return type;
    }
}

// 🛠️ تابع کمکی برای فارسی کردن نام پلتفرم
function getPlatformFa(platform: string): string {
    switch (platform.toLowerCase()) {
        case "facebook":
            return "فیسبوک";
        case "instagram":
            return "اینستاگرام";
        case "twitter":
            return "توییتر";
        case "youtube":
            return "یوتیوب";
        default:
            return platform;
    }
}

export function EngagementSection() {
    const [engagements, setEngagements] = useState<Engagement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("http://127.0.0.1:8000/facebook/engagements/")
                .then(res => res.json())
                .then(data => data.map((e: any) => ({...e, platform: "facebook", created_date: e.created_date}))),
            fetch("http://127.0.0.1:8000/instagram/engagements/")
                .then(res => res.json())
                .then(data => data.map((e: any) => ({...e, platform: "instagram", created_date: e.created_date}))),
            fetch("http://127.0.0.1:8000/twitter/engagements/")
                .then(res => res.json())
                .then(data => data.map((e: any) => ({...e, platform: "twitter", created_date: e.created_date}))),
            fetch("http://127.0.0.1:8000/youtube/engagements/")
                .then(res => res.json())
                .then(data => data.map((e: any) => ({...e, platform: "youtube", created_date: e.created_date}))),
        ])
            .then(([fb, ig, tw, yt]) => {
                setEngagements([...fb, ...ig, ...tw, ...yt]);
                setLoading(false);
            })
            .catch(err => {
                console.error("دریافت تعاملات ناموفق بود:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">
                آخرین تعاملات در تمام پلتفرم‌ها
            </h2>
            <div className="grid gap-4">
                {engagements.map(e => (
                    <Card key={`${e.platform}-${e.id}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                <span>
                  {getTypeFa(e.type)} ({getPlatformFa(e.platform)})
                </span>
                                <span className="text-xs text-muted-foreground">
                  {e.created_date
                      ? new Date(e.created_date).toLocaleString()
                      : "ندارد"}
                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <span className="font-semibold">ایمیل: </span>
                                <span className="font-semibold">
      {typeof e.user === "string" ? e.user : JSON.stringify(e.user)}
    </span>
                            </div>
                            <div>
                                {getTypeFa(e.type)} شده روی پست:{" "}
                                <span className="italic">{getPostContent(e)}</span>
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
    );
}
