"use client";

import React from "react";
import { useCategory } from "@/context/CategoryContext";
import fashionData from "@/data/fashion.json";

export default function FashionSubNav() {
  const { fashionSubTab, setFashionSubTab } = useCategory();

  return (
    <div className="w-full pt-2.5 pb-1 select-none">
      <div className="flex items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth px-1">
        {fashionData.subTabs.map((tab) => {
          const isActive = (fashionSubTab || "men").toLowerCase() === tab.id.toLowerCase();

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFashionSubTab(tab.id)}
              className={`relative pb-1.5 font-nunito text-[16px] sm:text-[18px] leading-[36px] tracking-normal transition-all duration-200 whitespace-nowrap cursor-pointer flex-shrink-0 ${
                isActive
                  ? "text-white font-medium"
                  : "text-white/60 hover:text-white/90 font-normal"
              }`}
            >
              <span>{tab.name}</span>
              {/* Active Underline Indicator matching Figma reference (solid white horizontal bar) */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
