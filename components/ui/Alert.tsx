import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
}

export default function Alert({ variant = "info", title, children, className, ...props }: AlertProps) {
  const variants = {
    info: {
      container: "bg-primary-50 border-primary-200 text-primary-800",
      icon: <Info className="w-5 h-5 text-primary-600" />,
    },
    success: {
      container: "bg-success-50 border-success-200 text-success-800",
      icon: <CheckCircle className="w-5 h-5 text-success-600" />,
    },
    warning: {
      container: "bg-warning-50 border-warning-200 text-warning-800",
      icon: <AlertTriangle className="w-5 h-5 text-warning-600" />,
    },
    danger: {
      container: "bg-danger-50 border-danger-200 text-danger-800",
      icon: <AlertCircle className="w-5 h-5 text-danger-600" />,
    },
  };

  const config = variants[variant];

  return (
    <div
      className={cn(
        "border-2 rounded-lg p-4 flex gap-3",
        config.container,
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
