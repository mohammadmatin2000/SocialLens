"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Engagement = {
  id: number;
  type: string;
  user: string | object;
  post: any; // object یا عدد یا رشته
  created_date?: string; // تاریخ پست
  platform: "facebook" | "instagram" | "twitter" | "youtube";
};

export function EngagementSection() {
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch جداگانه برای هر پلتفرم و اضافه کردن فیلد platform و created_date
    Promise.all([
      fetch("http://127.0.0.1:8000/facebook/engagements/")
        .then(res => res.json())
        .then(data => data.map((e: any) => ({ ...e, platform: "facebook", created_date: e.created_date }))),
      fetch("http://127.0.0.1:8000/instagram/engagements/")
        .then(res => res.json())
        .then(data => data.map((e: any) => ({ ...e, platform: "instagram", created_date: e.created_date }))),
      fetch("http://127.0.0.1:8000/twitter/engagements/")
        .then(res => res.json())
        .then(data => data.map((e: any) => ({ ...e, platform: "twitter", created_date: e.created_date }))),
      fetch("http://127.0.0.1:8000/youtube/engagements/")
        .then(res => res.json())
        .then(data => data.map((e: any) => ({ ...e, platform: "youtube", created_date: e.created_date }))),
    ])
      .then(([fb, ig, tw, yt]) => {
        setEngagements([...fb, ...ig, ...tw, ...yt]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch engagements:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">All Platforms Recent Engagements</h2>
      <div className="grid gap-4">
        {engagements.map((e) => (
          <Card key={`${e.platform}-${e.id}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{e.type} ({e.platform})</span>
                <span className="text-xs text-muted-foreground">
                  {e.created_date ? new Date(e.created_date).toLocaleString() : "No Date"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span className="font-semibold">
                  {typeof e.user === "string" ? e.user : JSON.stringify(e.user)}
                </span>{" "}
                {e.type.toLowerCase()}d on post:{" "}
                <span className="italic">
                  {typeof e.post === "object" && e.post !== null
                    ? e.post.content ?? e.post.text ?? "No content"
                    : e.post ?? "No content"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
