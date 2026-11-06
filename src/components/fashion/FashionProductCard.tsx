"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export interface FashionProduct {
  id: string;
  name: string;
  shortName?: string;
  brand?: string;
  price: number;
  currency?: string;
  badge?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

interface FashionProductCardProps {
  product: FashionProduct;
}

export default function FashionProductCard({ product }: FashionProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group flex flex-col cursor-pointer select-none">
      {/* Product Image Frame (Matches Figma clean rounded portrait card) */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F2EFE9] border border-gray-200/60 shadow-sm group-hover:shadow-md transition-all duration-300">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Top-Right Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/70 hover:bg-white backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-90 z-10"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Bottom-Left "New" Pill Badge */}
        {product.badge && (
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
            <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Product Details Underneath Image */}
      <div className="mt-2 sm:mt-2.5 px-0.5">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-amber-800 transition-colors line-clamp-1 tracking-tight">
          {product.shortName || product.name}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
