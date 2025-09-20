"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggler } from "../ThemeToggler";

export function SettingsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">تنظیمات</h2>
      <Card>
        <CardHeader>
          <CardTitle>ظاهر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span>تم :</span>
            <ThemeToggler />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
