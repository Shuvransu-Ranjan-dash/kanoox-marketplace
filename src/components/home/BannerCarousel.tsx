"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBanner } from "@/types/banner";

interface BannerCarouselProps {
  banners: HeroBanner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPos, setScrollStartPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const total = banners.length;

  // Track active slide based on scroll position
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 16; // card width + gap
    const activeIndex = Math.min(
      Math.max(0, Math.round(el.scrollLeft / cardWidth)),
      total - 1
    );
    setCurrentSlide(activeIndex);
  }, [total]);

  // Scroll to a specific slide
  const scrollToSlide = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 16;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  };

  // Auto-advance carousel when not paused or dragged
  useEffect(() => {
    if (isPaused || isDragging || total <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % total;
      scrollToSlide(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, currentSlide, total]);

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
    handleScroll();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto select-none py-1 group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        Scrollable Card Track:
        - Exact same UI responsiveness as CategorySection
        - Native touch swipe on mobile with next card peeking on the right
        - Mouse drag-to-scroll on desktop
        - Mouse wheel horizontal scrolling
        - Clean layout with NO arrow buttons blocking the card!
      */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
        className={`flex items-stretch gap-3 sm:gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 px-1 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {banners.map((banner) => {
          const isParadisePlates = banner.id === "hero-paradise-plates";

          return (
            <div
              key={banner.id}
              className={`flex-shrink-0 snap-start overflow-hidden rounded-3xl sm:rounded-[2.2rem] shadow-2xl border border-white/20 transition-transform duration-300 ${
                total > 1
                  ? "w-[88%] sm:w-[86%] md:w-[88%] lg:w-[92%] xl:w-[95%]"
                  : "w-full"
              }`}
            >
              {isParadisePlates ? (
                /* ======================================================== */
                /* PARADISE PLATES HERO BANNER (Matches Reference Figma)    */
                /* ======================================================== */
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[440px] 2xl:h-[470px] bg-gradient-to-r from-[#FCE4EC] via-[#F8BBD0] to-[#F48FB1] p-5 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                  {/* Background Festive Disco Ball Spheres & Ambience */}
                  <div className="absolute -top-10 -left-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-45 blur-[2px] pointer-events-none" />
                  <div className="absolute top-4 -right-6 w-36 sm:w-52 md:w-68 h-36 sm:h-52 md:h-68 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-600 opacity-45 blur-[2px] pointer-events-none" />
                  <div className="absolute bottom-2 left-1/4 w-24 h-24 rounded-full bg-pink-300/40 blur-xl pointer-events-none" />

                  {/* Top Row: "Tikkets" ribbon badge & Hands for Hunger Official Seal */}
                  <div className="relative z-10 flex items-start justify-between">
                    {/* Black "Tikkets" badge rotated with neon pink border */}
                    <div className="bg-black text-white text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl -rotate-12 shadow-xl flex items-center gap-1.5 border border-pink-400/60 pointer-events-none">
                      <span className="text-yellow-400">★</span>
                      <span>TIKKETS</span>
                    </div>

                    {/* Hands for Hunger Paradise Plates Emblem */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-xl border-2 border-amber-600/40 p-1.5 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-[14px] sm:text-[18px] md:text-[22px] leading-none">🌴</span>
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black text-emerald-800 uppercase leading-none mt-0.5">Hands for</span>
                      <span className="text-[8px] sm:text-[10px] md:text-[11px] font-black text-amber-700 uppercase leading-none">HUNGER</span>
                      <span className="text-[6px] sm:text-[7px] md:text-[8px] font-medium text-slate-500 leading-none">Paradise Plates</span>
                    </div>
                  </div>

                  {/* Center Typography: "Paradise Plates" in elegant dark plum serif font */}
                  <div className="relative z-10 text-center my-auto pointer-events-none">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-[#3A0D38] font-serif drop-shadow-sm leading-tight">
                      Paradise Plates
                    </h2>
                    <p className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-[#5C1B58] tracking-wide mt-1.5 sm:mt-2.5">
                      {banner.subtitle}
                    </p>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="relative z-10 flex justify-center pb-1">
                    <Link
                      href={banner.ctaLink}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-2 bg-[#4A0E4E] hover:bg-[#380A3B] text-white text-xs sm:text-sm md:text-base font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-xl transition-all active:scale-95 group"
                    >
                      <span>{banner.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* ======================================================== */
                /* STANDARD PROMOTIONAL BANNER SLIDE                        */
                /* ======================================================== */
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[440px] 2xl:h-[470px] bg-slate-900">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover object-center pointer-events-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1560px) 1440px, 1560px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none" />

                  <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 text-white z-10 max-w-2xl">
                    {banner.discountBadge && (
                      <span className="self-start inline-flex items-center gap-1 text-[10px] sm:text-xs font-extrabold uppercase bg-brand-primary text-white px-3 py-1 rounded-full mb-3 shadow-md pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5" />
                        {banner.discountBadge}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-md pointer-events-none">
                      {banner.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 mt-2 line-clamp-2 max-w-lg pointer-events-none">
                      {banner.subtitle}
                    </p>
                    <Link
                      href={banner.ctaLink}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="self-start mt-5 inline-flex items-center gap-2 bg-white text-slate-900 text-xs sm:text-sm md:text-base font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-lg active:scale-95"
                    >
                      <span>{banner.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Indicator Dots */}
      {total > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-3">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-7 h-2 bg-white shadow-sm"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
