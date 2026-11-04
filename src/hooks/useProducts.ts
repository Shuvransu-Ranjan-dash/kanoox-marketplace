"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getProducts, getFeaturedProducts, getPopularProducts, searchProducts } from "@/services/product.service";

export function useProducts(filter?: "all" | "featured" | "popular", searchQuery?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      let data: Product[] = [];
      if (searchQuery && searchQuery.trim()) {
        data = await searchProducts(searchQuery);
      } else if (filter === "featured") {
        data = await getFeaturedProducts();
      } else if (filter === "popular") {
        data = await getPopularProducts();
      } else {
        data = await getProducts();
      }

      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filter, searchQuery]);

  return { products, loading };
}
