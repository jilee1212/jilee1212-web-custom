"use client";

import { Bell, Settings, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          Welcome back, {session?.user?.name || "Admin"}
        </h2>
        <p className="text-sm text-neutral-500">
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>

        <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-2 text-neutral-600 bg-neutral-50 rounded-lg">
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">{session?.user?.name || "Admin"}</span>
        </div>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 px-3 py-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">로그아웃</span>
          </button>
        )}
      </div>
    </header>
  );
}
