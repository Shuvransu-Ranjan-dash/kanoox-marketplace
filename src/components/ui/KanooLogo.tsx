import React from "react";

interface KanooLogoProps {
  className?: string;
}

export default function KanooLogo({ className = "w-7 h-7" }: KanooLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kanoo Logo"
    >
      {/* Sleek Kanoo Folded Ribbon 'X' Logo */}
      <g>
        {/* Main diagonal fold (top-left to bottom-right) */}
        <polygon
          points="20,18 42,42 22,66 12,54 26,38 12,24"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />
        <polygon
          points="80,18 58,42 78,66 88,54 74,38 88,24"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />
        {/* Bottom crossing ribbon */}
        <polygon
          points="22,82 48,52 62,68 40,92 24,92"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />
        <polygon
          points="78,82 52,52 38,68 60,92 76,92"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />
        {/* Center geometric intersection */}
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
