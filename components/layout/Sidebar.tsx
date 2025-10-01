"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  DollarSign,
  Droplet,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/daily", label: "일일 모니터링", icon: Calendar },
  { href: "/contract", label: "컨트랙트 정보", icon: FileText },
  { href: "/finance", label: "재무 관리", icon: DollarSign },
  { href: "/liquidity", label: "유동성 추적", icon: Droplet },
  { href: "/reports", label: "주간 리포트", icon: BarChart3 },
  { href: "/issues", label: "이슈 트래커", icon: AlertCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <h1 className="text-2xl font-bold text-primary-500">LUMINA DEX</h1>
        <p className="text-sm text-neutral-500 mt-1">운영 대시보드</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <div className="text-xs text-neutral-500">
          <p>Last updated:</p>
          <p className="font-medium text-neutral-700 mt-1">
            {new Date().toLocaleString("ko-KR")}
          </p>
        </div>
      </div>
    </aside>
  );
}
