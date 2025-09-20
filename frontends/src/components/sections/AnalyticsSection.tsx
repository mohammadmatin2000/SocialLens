"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Eye, MessageCircle, BarChart3, Target, Globe, Clock } from "lucide-react";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

type AnalyticsData = {
  platform: "facebook" | "instagram" | "twitter" | "youtube";
  total_followers?: number;
  total_subscribers?: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_saves: number;
  total_views: number;
  estimated_growth?: number;
  engagement_rate?: number;
};

export function AnalyticsSection() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/facebook/analyticsview/").then(res => res.json()).then(data => data.map((d: any) => ({ ...d, platform: "facebook" }))),
      fetch("http://127.0.0.1:8000/instagram/analyticsview/").then(res => res.json()).then(data => data.map((d: any) => ({ ...d, platform: "instagram" }))),
      fetch("http://127.0.0.1:8000/twitter/analyticsview/").then(res => res.json()).then(data => data.map((d: any) => ({ ...d, platform: "twitter" }))),
      fetch("http://127.0.0.1:8000/youtube/analyticsview/").then(res => res.json()).then(data => data.map((d: any) => ({ ...d, platform: "youtube" }))),
    ])
      .then(([fb, ig, tw, yt]) => {
        setAnalytics([...fb, ...ig, ...tw, ...yt]);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطا در دریافت داده‌ها:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>در حال بارگذاری...</div>;

  // داده‌های نمودارها
  const followerGrowthData = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: analytics.map(a => ({
      label: a.platform.charAt(0).toUpperCase() + a.platform.slice(1),
      data: Array(6).fill(a.platform === "youtube" ? a.total_subscribers : a.total_followers), // استفاده از total_subscribers برای یوتیوب
      borderColor: a.platform === "facebook" ? "#1877f2" :
                   a.platform === "instagram" ? "#e4405f" :
                   a.platform === "twitter" ? "#1da1f2" : "#ff0000",
      backgroundColor: a.platform === "facebook" ? "rgba(24,119,242,0.1)" :
                       a.platform === "instagram" ? "rgba(228,64,95,0.1)" :
                       a.platform === "twitter" ? "rgba(29,161,242,0.1)" : "rgba(255,0,0,0.1)",
      tension: 0.4,
      fill: true,
    })),
  };

  const engagementRateData = {
    labels: analytics.map(a => a.platform.charAt(0).toUpperCase() + a.platform.slice(1)),
    datasets: [
      {
        label: "نرخ تعامل (%)",
        data: analytics.map(a => a.engagement_rate ?? 0),
        backgroundColor: analytics.map(a =>
          a.platform === "facebook" ? "#1877f2" :
          a.platform === "instagram" ? "#e4405f" :
          a.platform === "twitter" ? "#1da1f2" : "#ff0000"
        ),
      },
    ],
  };

  const reachData = {
    labels: ["ارگانیک", "پرداخت‌شده", "ویروسی", "سایر"],
    datasets: [
      {
        label: "توزیع دسترسی",
        data: [320000, 180000, 44000, 12000],
        backgroundColor: ["#10b981", "#f59e42", "#6366f1", "#ef4444"],
      },
    ],
  };

  const demographicsData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "توزیع سنی",
        data: [25, 35, 22, 12, 6],
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">تحلیل و آمار پلتفرم‌ها</h2>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map(a => (
          <Card key={a.platform}>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">{a.platform.charAt(0).toUpperCase() + a.platform.slice(1)}</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {a.platform === "youtube" ? a.total_subscribers : a.total_followers}
              </div>
              <p className="text-xs text-muted-foreground">رشد تخمینی: {a.estimated_growth}</p>
              <p className="text-xs text-muted-foreground">نرخ تعامل: {a.engagement_rate}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">روند رشد دنبال‌کننده</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Line data={followerGrowthData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">نرخ تعامل پلتفرم‌ها</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Bar data={engagementRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
