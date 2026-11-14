import React from "react";
import Image from "next/image";

interface KanooLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function KanooLogo({
  className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10",
  width = 153,
  height = 145,
}: KanooLogoProps) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
      <Image
        src="/images/logos/Logo.png"
        alt="Kanoo Logo"
        width={width}
        height={height}
        className="w-full h-full object-contain drop-shadow-md"
        priority
      />
    </div>
  );
}
