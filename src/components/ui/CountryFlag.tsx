import React from "react";

interface CountryFlagProps {
  countryId: string;
  className?: string;
}

export default function CountryFlag({ countryId, className = "w-6 h-6" }: CountryFlagProps) {
  switch (countryId) {
    case "bahamas":
      // Circular flag of The Bahamas: Aquamarine top & bottom, yellow gold center, black triangle on left
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="10.6" fill="#00778B" />
          <rect y="10.6" width="32" height="10.7" fill="#FFC72C" />
          <rect y="21.3" width="32" height="10.7" fill="#00778B" />
          <polygon points="0,0 15,16 0,32" fill="#000000" />
        </svg>
      );

    case "trinidad":
      // Circular flag of Trinidad & Tobago: Red field with black diagonal stripe bordered by white
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="32" fill="#CE1126" />
          {/* White border for the diagonal stripe */}
          <polygon points="0,0 8,0 32,24 32,32 24,32 0,8" fill="#FFFFFF" />
          {/* Black diagonal stripe */}
          <polygon points="0,2 6,0 32,26 32,30 26,32 0,6" fill="#000000" />
        </svg>
      );

    case "jamaica":
      // Circular flag of Jamaica: Green and black triangles separated by gold saltire
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="32" fill="#000000" />
          <polygon points="0,0 16,16 32,0" fill="#009B3A" />
          <polygon points="0,32 16,16 32,32" fill="#009B3A" />
          <path d="M0,0 L32,32 M32,0 L0,32" stroke="#FED100" strokeWidth="4" />
        </svg>
      );

    case "guyana":
      // Circular flag of Guyana: Green base, white border, yellow arrow, black border, red triangle
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="32" fill="#009E49" />
          <polygon points="0,0 32,16 0,32" fill="#FFFFFF" />
          <polygon points="0,2 29,16 0,30" fill="#FCD116" />
          <polygon points="0,0 16,16 0,32" fill="#000000" />
          <polygon points="0,2 14,16 0,30" fill="#CE1126" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="10.6" fill="#00778B" />
          <rect y="10.6" width="32" height="10.7" fill="#FFC72C" />
          <rect y="21.3" width="32" height="10.7" fill="#00778B" />
          <polygon points="0,0 15,16 0,32" fill="#000000" />
        </svg>
      );
  }
}
