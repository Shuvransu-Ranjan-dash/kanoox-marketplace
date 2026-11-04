"use client";

import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/utils/helpers";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProductPrice({
  price,
  originalPrice,
  currency,
  size = "md",
  className,
}: ProductPriceProps) {
  const { currentCountry } = useTheme();
  const activeCurrency = currency || currentCountry.currency;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-2xl",
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={cn("flex items-baseline flex-wrap gap-1.5", className)}>
      <span className={cn("font-bold text-brand-primary tracking-tight", sizeClasses[size])}>
        {formatPrice(price, activeCurrency)}
      </span>

      {hasDiscount && (
        <span className="text-xs text-content-secondary line-through opacity-70">
          {formatPrice(originalPrice, activeCurrency)}
        </span>
      )}
    </div>
  );
}
