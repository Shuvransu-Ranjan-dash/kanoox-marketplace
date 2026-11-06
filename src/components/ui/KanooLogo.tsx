import React from "react";

interface KanooLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function KanooLogo({
  className = "w-7 h-7 sm:w-8 sm:h-8",
}: KanooLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kanoo Logo"
    >
      <defs>
        <linearGradient id="kanoo-silver-fold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Sleek Kanoo Origami Ribbon 'X' Logo matching Figma reference */}
      <g>
        {/* Main white left-side folded chevron (<) */}
        <polygon
          points="22,24 40,24 58,48 40,76 22,76 44,48"
          fill="#FFFFFF"
        />
        {/* Top-right sharp needle wing extending upwards */}
        <polygon
          points="82,20 46,46 54,54 86,22"
          fill="#FFFFFF"
        />
        {/* Bottom-right angled silver fold ribbon */}
        <polygon
          points="46,46 76,78 58,78 38,54"
          fill="url(#kanoo-silver-fold)"
        />
        {/* Subtle center intersection depth shadow */}
        <polygon
          points="44,48 54,48 50,56 42,52"
          fill="#0F172A"
          fillOpacity="0.25"
        />
      </g>
    </svg>
  );
}
