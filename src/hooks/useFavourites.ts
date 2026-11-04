"use client";

import { useState, useEffect } from "react";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kanoox_favourites");
      if (saved) {
        setFavourites(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  const toggleFavourite = (productId: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      try {
        localStorage.setItem("kanoox_favourites", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isFavourite = (productId: string): boolean => {
    return favourites.includes(productId);
  };

  return {
    favourites,
    toggleFavourite,
    isFavourite,
    count: favourites.length,
    isInitialized,
  };
}
