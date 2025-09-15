"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = ["draft", "scheduled", "published", "failed"];
const PLATFORMS = ["Facebook", "Instagram", "Twitter", "YouTube"];
const PLATFORM_NAMES_FA: Record<string, string> = {
  Facebook: "فیسبوک",
  Instagram: "اینستاگرام",
  Twitter: "توییتر",
  YouTube: "یوتیوب",
};

const API_BASE = "http://127.0.0.1:8000";

export default function NewPostPage() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [campaign, setCampaign] = useState("");
  const [tags, setTags] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      content,
      campaign,
      tags: tags.split(",").map(t => t.trim()),
      platforms: [platform],
      status,
    };

    try {
      const endpoint = platform === "YouTube" ? "videos" : "posts";

      const res = await fetch(`${API_BASE}/${platform.toLowerCase()}/${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "خطا در ایجاد پست");
      }

      // بعد از موفقیت، به صفحه لیست پست‌ها برو
      router.push("/"); // مسیر صفحه لیست پست‌ها، تغییر بده مطابق پروژه‌ی خودت
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">ایجاد پست جدید</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* پلتفرم */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">پلتفرم</label>
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {PLATFORMS.map(p => (
            <option key={p} value={p}>
              {PLATFORM_NAMES_FA[p]}
            </option>
          ))}
        </select>
      </div>

      {/* متن پست */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-medium">متن پست</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24"
          placeholder="متن پست را اینجا وارد کنید..."
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
        <label className="font-medium">تگ‌ها (با کاما جدا شوند)</label>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="مثلا: تخفیف,جدید,محصول"
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

      {/* دکمه ذخیره */}
      <Button
        onClick={handleSubmit}
        className={`w-full py-2 text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        disabled={loading}
      >
        {loading ? "در حال ایجاد..." : "ایجاد پست"}
      </Button>
    </div>
  );
}
