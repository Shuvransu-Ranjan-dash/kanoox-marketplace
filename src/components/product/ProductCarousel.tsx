"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/utils/helpers";

interface ProductCarouselProps {
  products: Product[];
  className?: string;
}

export default function ProductCarousel({ products, className }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative group/carousel", className)}>
      {/* Left Navigation Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-content-primary hover:text-brand-primary hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100"
        aria-label="Previous products"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[200px] sm:w-[240px] md:w-[260px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-content-primary hover:text-brand-primary hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 focus:opacity-100"
        aria-label="Next products"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
