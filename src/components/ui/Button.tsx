import React from "react";
import { cn } from "@/utils/helpers";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-sm gap-1.5",
    md: "text-sm px-4 py-2.5 rounded-md gap-2",
    lg: "text-base px-6 py-3.5 rounded-lg gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-hover active:scale-[0.98] shadow-sm hover:shadow focus:ring-brand-primary",
    secondary:
      "bg-brand-light text-brand-primary hover:bg-brand-secondary/20 active:scale-[0.98] focus:ring-brand-secondary",
    outline:
      "border border-border text-content-primary hover:bg-black/5 hover:border-brand-primary active:scale-[0.98] focus:ring-brand-primary",
    ghost:
      "text-content-secondary hover:text-content-primary hover:bg-black/5 focus:ring-gray-300",
    danger:
      "bg-accent-red text-white hover:bg-red-600 active:scale-[0.98] focus:ring-red-500",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
