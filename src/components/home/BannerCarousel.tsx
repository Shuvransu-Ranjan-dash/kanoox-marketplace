"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { HeroBanner } from "@/types/banner";
import Button from "@/components/ui/Button";

interface BannerCarouselProps {
  banners: HeroBanner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, total, nextSlide]);

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden shadow-card group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* Gradient Overlay for high readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

            {/* Content Container */}
            <div className="relative h-full max-w-xl flex flex-col justify-center px-6 sm:px-12 md:px-16 text-white z-20">
              {banner.discountBadge && (
                <div className="inline-flex items-center gap-1.5 self-start bg-brand-primary text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full mb-3 tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{banner.discountBadge}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-secondary mb-1">
                {banner.tagline}
              </p>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2">
                {banner.title}
              </h1>

              {banner.highlightText && (
                <p className="text-base sm:text-xl font-bold text-accent-yellow mb-2">
                  {banner.highlightText}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-md mb-6 leading-relaxed">
                {banner.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href={banner.ctaLink}>
                  <Button
                    variant="primary"
                    size="md"
                    className="font-bold shadow-lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {banner.ctaText}
                  </Button>
                </Link>

                {banner.secondaryCtaText && (
                  <Link href={banner.secondaryCtaLink || "#"}>
                    <Button
                      variant="outline"
                      size="md"
                      className="border-white/50 text-white hover:bg-white hover:text-black font-semibold backdrop-blur-sm"
                    >
                      {banner.secondaryCtaText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-6 sm:left-12 md:left-16 z-20 flex items-center space-x-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-brand-primary"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
