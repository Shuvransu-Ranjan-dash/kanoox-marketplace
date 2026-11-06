"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useFavourites } from "@/hooks/useFavourites";
import ProductPrice from "@/components/product/ProductPrice";
import Badge from "@/components/ui/Badge";
import { cn } from "@/utils/helpers";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { toggleFavourite, isFavourite } = useFavourites();
  const [isHovered, setIsHovered] = useState(false);

  const isFav = isFavourite(product.id);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(product.id);
  };

  return (
    <div
      className={cn(
        "group relative bg-surface border border-border rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-card-hover hover:border-brand-primary/40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        {/* Main Image */}
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <Badge
              variant={product.badge.includes("%") ? "discount" : "primary"}
              size="sm"
            >
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="neutral" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleFav}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm",
            isFav
              ? "bg-red-50 text-red-500 scale-110"
              : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
          )}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand info */}
          <div className="flex items-center justify-between text-[11px] text-content-secondary mb-1">
            <span className="font-medium hover:text-brand-primary transition-colors">
              {product.categoryName}
            </span>
            {product.brand && (
              <span className="text-gray-400 font-semibold">{product.brand}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-semibold text-content-primary line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating stars */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-gray-200 fill-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-content-primary">
              {product.rating}
            </span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing Bar */}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            size="md"
          />

          <span
            className={cn(
              "text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border",
              product.inStock
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : "text-rose-700 bg-rose-50 border-rose-200"
            )}
          >
            {product.inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>
    </div>
  );
}
