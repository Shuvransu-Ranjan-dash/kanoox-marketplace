"use client";

import React, { useMemo } from "react";
import { Filter, X, Sparkles } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { useCategory } from "@/context/CategoryContext";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { Product } from "@/types/product";

const allProducts: Product[] = productsData as Product[];

export default function FeaturedProducts() {
  const { selectedCategory, clearCategory } = useCategory();

  // Find category details if active
  const activeCategoryMeta = useMemo(() => {
    if (!selectedCategory) return null;
    return categoriesData.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  // Dynamically filter products based on active category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return allProducts.filter((p) => p.isFeatured);
    }
    return allProducts.filter(
      (p) =>
        p.categoryId.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "household" && (p.categoryId === "appliances" || p.tags?.includes("Household"))) ||
        (selectedCategory === "fashion" && (p.categoryId === "fashion" || p.tags?.includes("Fashion")))
    );
  }, [selectedCategory]);

  return (
    <section id="products-section" className="py-7 sm:py-9 scroll-mt-28 sm:scroll-mt-36">
      <Container>
        {/* Section Heading with Dynamic Category Title */}
        <SectionHeading
          badge={activeCategoryMeta ? `DEPARTMENT: ${activeCategoryMeta.name.toUpperCase()}` : "CURATED DEALS"}
          title={activeCategoryMeta ? `${activeCategoryMeta.name} Collection` : "Featured Marketplace Products"}
          subtitle={
            activeCategoryMeta
              ? `Showing all in-stock products matching ${activeCategoryMeta.name}`
              : "Authentic electronics, fashion, household appliances & events with Caribbean warranty"
          }
          viewAllLink="#products"
          viewAllText="View all"
        />

        {/* Active Filter Pill Bar (Shown when a category is selected) */}
        {selectedCategory && (
          <div className="mb-5 py-2.5 px-3.5 sm:px-4 bg-brand-light/70 border border-brand-primary/20 rounded-xl flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Filter className="w-3 h-3" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-content-secondary">Filtered by: </span>
                <strong className="text-brand-primary font-bold">{activeCategoryMeta?.name || selectedCategory}</strong>
                <span className="text-content-secondary ml-1.5 font-medium">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"})
                </span>
              </div>
            </div>

            <button
              onClick={clearCategory}
              className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-red-600 bg-white hover:bg-red-50 border border-border hover:border-red-200 px-2.5 py-1 rounded-lg shadow-sm transition-all active:scale-95 flex-shrink-0"
              title="Clear category filter"
            >
              <X className="w-3 h-3" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} columns={4} />
      </Container>
    </section>
  );
}
