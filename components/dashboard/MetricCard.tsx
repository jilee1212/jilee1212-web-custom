import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: "primary" | "success" | "warning" | "danger";
}

const colorClasses = {
  primary: "bg-primary-50 text-primary-600",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
};

export default function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-lg", colorClasses[color])}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium",
          isPositive ? "text-success-600" : "text-danger-600"
        )}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
