import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export default function Card({ className, title, description, children, ...props }: CardProps) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow p-6", className)}
      {...props}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>}
          {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
