import React from "react";
import { cn } from "@/utils/helpers";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  badge?: number | string;
  badgeColor?: string;
  label?: string;
}

export default function IconButton({
  children,
  variant = "ghost",
  size = "md",
  badge,
  badgeColor = "bg-accent-red text-white",
  label,
  className,
  ...props
}: IconButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const variantStyles = {
    primary: "bg-brand-primary text-white hover:bg-brand-hover shadow-sm",
    secondary: "bg-brand-light text-brand-primary hover:bg-brand-secondary/20",
    outline: "border border-border text-content-secondary hover:text-content-primary hover:bg-black/5 hover:border-gray-400",
    ghost: "text-content-secondary hover:text-content-primary hover:bg-black/5",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      aria-label={label}
      {...props}
    >
      {children}
      {badge !== undefined && badge !== 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm",
            badgeColor
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
