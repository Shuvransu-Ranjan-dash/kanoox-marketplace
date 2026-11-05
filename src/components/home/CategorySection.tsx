"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import categoriesData from "@/data/categories.json";
import Category3DIcon from "@/components/home/Category3DIcon";
import { useTheme } from "@/context/ThemeContext";
import { useCategory } from "@/context/CategoryContext";

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
  selectedCategory?: string;
  isCompact?: boolean;
}

export default function CategorySection({
  onSelectCategory,
  selectedCategory: propSelectedCategory,
  isCompact = true,
}: CategorySectionProps = {}) {
  const { currentCountry } = useTheme();
  const { selectedCategory: contextSelectedCategory, setSelectedCategory, clearCategory } = useCategory();

  const activeCategory = propSelectedCategory || contextSelectedCategory;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Drag-to-scroll state for desktop mouse users
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPos, setScrollStartPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Check scroll position and overflow
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const hasScrollOverflow = el.scrollWidth > el.clientWidth + 2;
    setIsOverflowing(hasScrollOverflow);
  }, []);

  // Set up resize observer & initial check
  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", checkScroll);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Mouse Drag-to-Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStartPos(el.scrollLeft);
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    el.scrollLeft = scrollStartPos - walk;
    checkScroll();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleSelect = (id: string) => {
    if (hasDragged) return; // Prevent selection if user was dragging to scroll
    if (activeCategory === id) {
      clearCategory();
      if (onSelectCategory) onSelectCategory("");
    } else {
      setSelectedCategory(id);
      if (onSelectCategory) onSelectCategory(id);
    }
  };

  return (
    <div className="relative w-full select-none py-1">
      {/* 
        Scrollable Track:
        - Uses justify-start when overflowing (ensuring left cards like Fashion are never cut off)
        - Uses justify-center when wide enough to fit without overflow
        - Supports native touch swipe, mouse drag-to-scroll, and mouse wheel horizontal scrolling
      */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
        className={`w-full flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 overflow-x-auto no-scrollbar ${
          isCompact ? "py-1" : "py-2"
        } scroll-smooth ${
          isOverflowing ? "justify-start" : "justify-between"
        } ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      >
        {categoriesData.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              style={{
                backgroundColor: isSelected ? "rgba(255, 255, 255, 0.14)" : currentCountry.cardBgCss,
                borderColor: isSelected ? "rgba(255, 255, 255, 0.45)" : currentCountry.cardBorderCss,
              }}
              className={`flex-1 min-w-[72px] sm:min-w-[80px] md:min-w-[88px] lg:min-w-[96px] xl:min-w-[104px] flex flex-col items-center justify-between transition-all duration-200 group text-center cursor-pointer border ${
                isSelected
                  ? "shadow-md ring-1 ring-white/30 scale-[1.02]"
                  : "hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20"
              } ${
                isCompact
                  ? "h-[78px] sm:h-[84px] md:h-[92px] lg:h-[98px] xl:h-[102px] p-1.5 sm:p-2 rounded-2xl"
                  : "h-[90px] sm:h-[100px] md:h-[114px] lg:h-[128px] xl:h-[136px] p-2 sm:p-2.5 lg:p-3 rounded-2xl lg:rounded-3xl"
              } backdrop-blur-lg relative shadow-sm`}
              title={isSelected ? `Click to clear filter` : `Filter by ${cat.name}`}
            >
              {/* Subtle mini cross button on selected category */}
              {isSelected && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    clearCategory();
                  }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors border border-black/15 z-20"
                  title="Clear filter"
                >
                  <X className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
              )}

              {/* 3D Category Icon with subtle hover lift */}
              <div className="flex-1 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 pointer-events-none">
                <Category3DIcon
                  type={cat.icon || cat.id}
                  className={
                    isCompact
                      ? "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 drop-shadow-md"
                      : "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-md"
                  }
                />
              </div>

              {/* Text Label - Multi-line supported with high-contrast legibility */}
              <span
                style={{ color: isSelected ? "#FFFFFF" : currentCountry.textMutedColor }}
                className={`font-semibold leading-[1.15] text-center max-w-full px-0.5 line-clamp-2 mt-1 transition-colors group-hover:text-white pointer-events-none ${
                  isCompact
                    ? "text-[10px] sm:text-[11px] lg:text-xs"
                    : "text-[11px] sm:text-xs lg:text-sm"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
