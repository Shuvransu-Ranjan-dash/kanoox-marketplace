"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FashionMiddleBannerProps {
  image?: string;
  title?: string;
  href?: string;
}

export default function FashionMiddleBanner({
  image = "/fashion/Middle_Fashion/image.png",
  title = "Bags That Carry the Look",
  href = "#bags",
}: FashionMiddleBannerProps) {
  return (
    <Link
      href={href}
      className="col-span-2 block relative w-full h-[110px] sm:h-[140px] md:h-[170px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 my-1 group select-none"
    >
      {/* Background Graphic */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center group-hover:scale-102 transition-transform duration-500 pointer-events-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1560px) 1440px, 1560px"
      />

      {/* Subtle Dark Gradient Overlay for perfect typography contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/20" />

      {/* Styled Typography Overlay matching the reference screenshot */}
      <div className="absolute inset-0 flex items-end justify-between p-3.5 sm:p-5 md:p-6 z-10">
        <div className="flex items-baseline gap-2">
          {/* Cursive / script "Bags" in bright neon lime */}
          <span className="font-serif italic font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#CCFF00] drop-shadow-md tracking-wide">
            Bags
          </span>
          {/* Clean White Serif "That Carry the Look" */}
          <span className="font-medium text-xs sm:text-base md:text-lg text-white drop-shadow tracking-tight">
            That Carry the Look
          </span>
        </div>

        {/* Neon Lime Circular Accent Dot on the Right */}
        <div className="flex items-center justify-center">
          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#CCFF00] shadow-[0_0_12px_rgba(204,255,0,0.8)] animate-pulse" />
        </div>
      </div>
    </Link>
  );
}
