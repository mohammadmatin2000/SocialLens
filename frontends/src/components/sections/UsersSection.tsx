"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

type User = {
  id: string;
  email: string;
  type: number;           // عدد type از Django
  type_display: string;   // متن قابل فهم type
  is_active: boolean;
  is_verified: boolean;
  user_profile: {
    first_name: string;
    last_name: string;
    image?: string;
  };
};

export function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/users/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    // منطق Invite User اینجا قرار میگیره
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {user.user_profile.first_name} {user.user_profile.last_name} ({user.type_display})
                </span>
                <span
                  className={
                    user.is_active
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>{user.email}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
