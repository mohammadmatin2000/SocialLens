// app/posts/[platform]/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = ["draft", "scheduled", "published", "failed"];
const PLATFORM_NAMES_FA: Record<string, string> = {
  Facebook: "فیسبوک",
  Instagram: "اینستاگرام",
  Twitter: "توییتر",
  YouTube: "یوتیوب",
};

type EditPostPageProps = {
  params: { platform: string; id: string };
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const platform = params.platform; // Twitter, Instagram, ...
  const postId = params.id;

  const [content, setContent] = useState("");
  const [campaign, setCampaign] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_BASE = "http://127.0.0.1:8000";

  // گرفتن اطلاعات قبلی پست
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/${platform.toLowerCase()}/posts/${postId}/`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات پست");
        const data = await res.json();
        setContent(data.content || "");
        setCampaign(data.campaign || "");
        setTags((data.tags || []).join(",")); // تگ‌ها رو به شکل رشته با کاما
        setStatus(data.status || "draft");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [platform, postId]);

  // بروزرسانی پست
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/${platform.toLowerCase()}/posts/${postId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          campaign,
          tags: tags
            .split(/[,#]/)       // جدا کردن با کاما یا #
            .map(t => t.trim())  // حذف فاصله اضافی
            .filter(t => t !== ""),
          status,
        }),
      });
      if (!res.ok) throw new Error("خطا در بروزرسانی پست");
      router.push("/"); // بعد از موفقیت برگرد به لیست پست‌ها
    } catch (err) {
      console.error(err);
      alert("خطا در بروزرسانی پست");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">ویرایش پست</h1>

      {/* پلتفرم فقط نمایش */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">پلتفرم</label>
        <input
          value={PLATFORM_NAMES_FA[platform] || platform}
          disabled
          className="p-2 border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* متن پست */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">متن پست</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24"
          placeholder="متن پست را وارد کنید..."
        />
      </div>

      {/* کمپین */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">کمپین</label>
        <input
          value={campaign}
          onChange={e => setCampaign(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="نام کمپین"
        />
      </div>

      {/* تگ‌ها */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">تگ‌ها (با کاما یا # جدا شوند)</label>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="مثلاً: تخفیف,درس,جدید"
        />
      </div>

      {/* وضعیت */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="font-medium">وضعیت</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>
              {s === "draft"
                ? "پیش‌نویس"
                : s === "scheduled"
                ? "زمان‌بندی شده"
                : s === "published"
                ? "منتشر شده"
                : "ناموفق"}
            </option>
          ))}
        </select>
      </div>

      {/* دکمه بروزرسانی */}
      <Button
        onClick={handleUpdate}
        className={`w-full py-2 text-white ${saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
        disabled={saving}
      >
        {saving ? "در حال بروزرسانی..." : "بروزرسانی پست"}
      </Button>
    </div>
  );
}
