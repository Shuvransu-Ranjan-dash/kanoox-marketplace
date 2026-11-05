"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface SeeAllLinkProps {
  href: string;
  text?: string;
  className?: string;
}

export default function SeeAllLink({
  href,
  text = "See all",
  className = "",
}: SeeAllLinkProps) {
  const { currentCountry } = useTheme();

  return (
    <Link
      href={href}
      style={{ color: currentCountry.primaryColor }}
      className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold transition-all group hover:opacity-80 select-none whitespace-nowrap flex-shrink-0 ${className}`}
    >
      <span className="tracking-tight whitespace-nowrap">{text}</span>
      {/* 
        Signature "Half-circle with Arrow" matching Figma reference:
        - Clean left half-circle arc opening to the right
        - Standalone arrow with clear visible gap (does NOT touch the circle)
      */}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 text-current transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left half-circle arc: curves around the left */}
        <path d="M 8 4.5 A 7.5 7.5 0 0 0 8 19.5" />
        {/* Arrow stem: separate with clear visible gap, never touches the arc */}
        <path d="M 11.5 12 H 21" />
        {/* Arrow chevron tip */}
        <path d="M 17 8 L 21 12 L 17 16" />
      </svg>
    </Link>
  );
}
