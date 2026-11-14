"use client";

import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/utils/helpers";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProductPrice({
  price,
  originalPrice,
  size = "md",
  className,
}: ProductPriceProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-2xl",
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={cn("flex items-baseline flex-wrap gap-1.5", className)}>
      <span className={cn("font-bold text-brand-primary tracking-tight", sizeClasses[size])}>
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <span className="text-xs text-content-secondary line-through opacity-70">
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
