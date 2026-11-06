"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SeeAllLinkProps {
  href: string;
  text?: string;
  className?: string;
  textColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function SeeAllLink({
  href,
  text = "See all",
  className = "",
  textColor,
  onClick,
}: SeeAllLinkProps) {
  // If explicitly styled with white text (e.g. in Popular Brands on dark cards), invert the PNG to white
  const isWhite =
    textColor?.toLowerCase().includes("white") ||
    textColor?.includes("255, 255, 255") ||
    className.includes("text-white");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center transition-all duration-200 hover:opacity-80 select-none flex-shrink-0 group ${className}`}
    >
      <div
        className={`relative h-[18px] sm:h-[22px] w-[60px] sm:w-[74px] transition-transform duration-200 group-hover:translate-x-0.5 ${
          isWhite ? "brightness-0 invert opacity-90 group-hover:opacity-100" : ""
        }`}
      >
        <Image
          src="/icons/See_All.png"
          alt={text}
          fill
          className="object-contain"
          sizes="74px"
          priority
        />
      </div>
    </Link>
  );
}
