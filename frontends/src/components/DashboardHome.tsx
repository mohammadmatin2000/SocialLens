"use client";
import { useState } from "react";
import { DashboardSection } from "./sections/DashboardSection";
import { PostsSection } from "./sections/PostsSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { EngagementSection } from "./sections/EngagementSection";
import { UsersSection } from "./sections/UsersSection";
import { SettingsSection } from "./sections/SettingsSection";
import { Sidebar } from "./Sidebar";

export function DashboardHome() {
  const [currentSection, setCurrentSection] = useState("داشبورد");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = (key: string) => {
    setCurrentSection(key);
    setSidebarOpen(false); // بستن سایدبار در موبایل
  };

  const renderSection = () => {
    switch (currentSection) {
      case "پست‌ها":
        return <PostsSection />;
      case "تحلیل‌ها":
        return <AnalyticsSection />;
      case "تعامل‌ها":
        return <EngagementSection />;
      case "مشتریان":
        return <UsersSection />;
      case "تنظیمات":
        return <SettingsSection />;
      default:
        return <DashboardSection onSelect={handleSelect} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* سایدبار */}
      <Sidebar
        selected={currentSection}
        onSelect={handleSelect}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* محتوای اصلی */}
      <main className="flex-1 p-6 ml-64">{renderSection()}</main>
    </div>
  );
}
