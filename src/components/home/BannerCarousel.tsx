"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          touchAction: "pan-x pan-y",
        }}
        className={`flex items-stretch gap-3 sm:gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 px-1 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {banners.map((banner) => {
          return (
            <div
              key={banner.id}
              className={`flex-shrink-0 snap-start overflow-hidden rounded-3xl sm:rounded-[2.2rem] shadow-2xl border border-white/20 transition-transform duration-300 ${
                total > 1
                  ? "w-[88%] sm:w-[86%] md:w-[88%] lg:w-[92%] xl:w-[95%]"
                  : "w-full"
              }`}
            >
              {/* Clean Banner Slide displaying full artwork or Kids Special Offer Banner */}
              {banner.id === "banner-kids-1" ? (
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[440px] 2xl:h-[470px] overflow-hidden bg-gradient-to-br from-[#FEF08A] via-[#FDE047] to-[#FACC15] select-none">
                  {/* Colorful Confetti Shapes */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-85">
                    <span className="absolute top-4 left-8 w-2 h-4 bg-[#EC4899] rotate-45 rounded-xs" />
                    <span className="absolute top-12 left-28 w-3 h-2 bg-[#06B6D4] -rotate-12 rounded-xs" />
                    <span className="absolute top-6 left-56 w-2 h-5 bg-[#8B5CF6] rotate-12 rounded-xs" />
                    <span className="absolute bottom-16 left-12 w-2 h-4 bg-[#F97316] rotate-45 rounded-xs" />
                    <span className="absolute bottom-8 left-36 w-3 h-2 bg-[#E11D48] -rotate-45 rounded-xs" />
                    <span className="absolute top-20 left-1/3 w-2 h-3 bg-[#10B981] rotate-90 rounded-xs" />
                    <span className="absolute bottom-20 left-1/2 w-3 h-2 bg-[#EC4899] rotate-12 rounded-xs" />
                    <span className="absolute top-8 right-1/3 w-3 h-2 bg-[#3B82F6] -rotate-30 rounded-xs" />
                    <span className="absolute top-24 right-1/4 w-2 h-4 bg-[#F59E0B] rotate-60 rounded-xs" />
                  </div>

                  {/* Left Side Promotional Content */}
                  <div className="absolute inset-y-0 left-0 w-3/5 sm:w-7/12 p-4 sm:p-7 md:p-10 lg:p-12 flex flex-col justify-center z-10">
                    <span className="font-serif italic text-base sm:text-2xl md:text-3xl lg:text-4xl text-[#BE123C] font-black tracking-wide drop-shadow-xs">
                      Special Offer
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#9F1239] tracking-tight leading-none mt-1 sm:mt-2 drop-shadow-xs">
                      UP TO 50% OFF
                    </h2>
                    <div className="mt-2 sm:mt-3.5 inline-flex items-center">
                      <span className="bg-[#E11D48] text-white text-[9px] sm:text-xs md:text-sm font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-md uppercase tracking-wider shadow-md">
                        THE BEST BRANDS, THE BEST PRICES
                      </span>
                    </div>

                    <div className="mt-3.5 sm:mt-5">
                      <span className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-900 text-white text-[11px] sm:text-xs md:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-xl transition-all">
                        <span>SHOP NOW</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Right Side Joyful Kid Artwork */}
                  <div className="absolute right-2 sm:right-6 md:right-12 bottom-0 top-0 w-2/5 sm:w-5/12 flex items-end justify-center pointer-events-none">
                    <div className="relative w-full h-full max-h-[92%] sm:max-h-[95%]">
                      <Image
                        src="/Fashion/Kids/4.png"
                        alt="Kids Fashion"
                        fill
                        className="object-contain object-bottom drop-shadow-xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`relative w-full overflow-hidden bg-slate-900 ${
                    banner.image?.includes("/Fashion/") ||
                    banner.id?.includes("fashion") ||
                    banner.id?.includes("men") ||
                    banner.id?.includes("women")
                      ? "aspect-[1.78/1] sm:aspect-[1.8/1] max-h-[440px]"
                      : "aspect-[4/3] sm:aspect-[16/10] md:aspect-[1.45/1] max-h-[460px]"
                  }`}
                >
                  {banner.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={banner.image}
                      className="w-full h-full object-cover pointer-events-none"
                    >
                      <source src={banner.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover object-center pointer-events-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1560px) 1440px, 1560px"
                      priority
                    />
                  )}

                  {/* Subtle bottom-right CTA Button */}
                  {banner.ctaText && (
                    <div className="absolute bottom-2.5 sm:bottom-4 md:bottom-6 right-2.5 sm:right-5 md:right-8 z-10">
                      {banner.ctaLink ? (
                        <Link
                          href={banner.ctaLink}
                          onClick={(e) => {
                            if (hasDragged) {
                              e.preventDefault();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/80 hover:bg-black backdrop-blur-md text-white text-[11px] sm:text-xs md:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xl transition-all active:scale-95 group border border-white/25 cursor-pointer"
                        >
                          <span>{banner.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/80 hover:bg-black backdrop-blur-md text-white text-[11px] sm:text-xs md:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xl transition-all border border-white/25">
                          <span>{banner.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
