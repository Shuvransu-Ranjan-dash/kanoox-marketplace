import React from "react";
import { cn } from "@/utils/helpers";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "discount";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold uppercase tracking-wider select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 rounded-sm",
    md: "text-xs px-2.5 py-1 rounded-sm",
  };

  const variantStyles = {
    primary: "bg-brand-primary text-white",
    secondary: "bg-brand-light text-brand-primary border border-brand-secondary/30",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-red-500 text-white",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
    discount: "bg-red-600 text-white shadow-sm font-extrabold",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
