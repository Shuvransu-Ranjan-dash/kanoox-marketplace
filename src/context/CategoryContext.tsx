"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CategoryContextType {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  clearCategory: () => void;
  fashionSubTab: string;
  setFashionSubTab: (tab: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategoryState] = useState<string | null>(null);
  const [fashionSubTab, setFashionSubTab] = useState<string>("men");

  // Sync with URL hash or query on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get("category");
      if (catParam) {
        setSelectedCategoryState(catParam);
      }
    } catch {
      // ignore
    }
  }, []);

  const setSelectedCategory = (categoryId: string | null) => {
    setSelectedCategoryState(categoryId);

    // Update URL query without full reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (categoryId) {
        url.searchParams.set("category", categoryId);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());

      // Auto-scroll to target section with a slight offset
      if (categoryId === "fashion") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (categoryId === "dine-out") {
        const dineOutEl = document.getElementById("dine-out");
        if (dineOutEl) {
          dineOutEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const clearCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        clearCategory,
        fashionSubTab,
        setFashionSubTab,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
