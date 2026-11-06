"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
          touchAction: "pan-x pan-y",
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
              className={`flex-1 min-w-[76px] sm:min-w-[84px] md:min-w-[92px] lg:min-w-[98px] xl:min-w-[104px] flex flex-col items-center justify-between transition-all duration-200 group text-center cursor-pointer border rounded-2xl backdrop-blur-md shadow-sm h-[88px] sm:h-[96px] md:h-[104px] lg:h-[110px] pt-2 pb-2 px-1.5 sm:px-2 relative ${
                isSelected
                  ? "bg-black/40 border-white/40 ring-1 ring-white/30 shadow-lg scale-[1.02]"
                  : "bg-white/[0.18] border-white/20 hover:scale-[1.03] hover:bg-black/35 hover:border-white/35"
              }`}
              title={isSelected ? `Click to clear filter` : `Filter by ${cat.name}`}
            >
              {/* 3D Category Icon with generous size matching Figma reference */}
              <div className="flex-1 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 pointer-events-none w-full">
                {cat.image ? (
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-[60px] xl:h-[60px]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain drop-shadow-md"
                      sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                      priority
                    />
                  </div>
                ) : (
                  <Category3DIcon
                    type={cat.icon || cat.id}
                    className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16 drop-shadow-md"
                  />
                )}
              </div>

              {/* Text Label - Multi-line supported with high-contrast legibility */}
              <span className="font-semibold text-white leading-[1.15] text-center max-w-full px-0.5 line-clamp-2 mt-0.5 text-[10.5px] sm:text-[11.5px] lg:text-xs tracking-tight pointer-events-none">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
