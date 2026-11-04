import React from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Loader";
import { cn } from "@/utils/helpers";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export default function ProductGrid({
  products,
  isLoading = false,
  columns = 4,
  className,
}: ProductGridProps) {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  };

  if (isLoading) {
    return (
      <div className={cn("grid gap-4 sm:gap-6", columnClasses[columns], className)}>
        {[...Array(columns * 2)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-12 text-center text-content-secondary bg-gray-50 rounded-lg border border-border">
        <p className="text-sm font-medium">No products available in this selection.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:gap-6", columnClasses[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
