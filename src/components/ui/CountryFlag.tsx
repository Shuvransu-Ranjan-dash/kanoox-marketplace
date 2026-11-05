import React from "react";

interface CountryFlagProps {
  countryId: string;
  className?: string;
}

export default function CountryFlag({ countryId, className = "w-6 h-6" }: CountryFlagProps) {
  switch (countryId) {
    case "india":
      // Circular flag of India (Tricolor: Saffron, White with Ashoka Chakra, India Green)
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="10.6" fill="#FF9933" />
          <rect y="10.6" width="32" height="10.7" fill="#FFFFFF" />
          <rect y="21.3" width="32" height="10.7" fill="#138808" />
          {/* Ashoka Chakra */}
          <circle cx="16" cy="16" r="4.2" fill="none" stroke="#000080" strokeWidth="0.8" />
          <circle cx="16" cy="16" r="0.9" fill="#000080" />
          {/* Spokes */}
          <line x1="16" y1="11.8" x2="16" y2="20.2" stroke="#000080" strokeWidth="0.5" />
          <line x1="11.8" y1="16" x2="20.2" y2="16" stroke="#000080" strokeWidth="0.5" />
          <line x1="13" y1="13" x2="19" y2="19" stroke="#000080" strokeWidth="0.5" />
          <line x1="13" y1="19" x2="19" y2="13" stroke="#000080" strokeWidth="0.5" />
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

    case "suriname":
      // Circular flag of Suriname: Green, white, red with gold star
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="32" height="32" fill="#377B2B" />
          <rect y="6.4" width="32" height="19.2" fill="#FFFFFF" />
          <rect y="9.6" width="32" height="12.8" fill="#B40A1B" />
          <polygon points="16,11 17.5,14.5 21,15 18.5,17 19.5,20.5 16,18.5 12.5,20.5 13.5,17 11,15 14.5,14.5" fill="#ECC81A" />
        </svg>
      );

    case "barbados":
      // Circular flag of Barbados: Ultramarine blue, gold with black trident
      return (
        <svg viewBox="0 0 32 32" className={`${className} rounded-full overflow-hidden shadow-sm flex-shrink-0`}>
          <rect width="10.6" height="32" fill="#00267F" />
          <rect x="10.6" width="10.7" height="32" fill="#FFC72C" />
          <rect x="21.3" width="10.7" height="32" fill="#00267F" />
          <path d="M16 11V22M13 13C13 17 16 19 16 19M19 13C19 17 16 19 16 19" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
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

    case "default":
    default:
      return (
        <div className={`${className} rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0`}>
          🌐
        </div>
      );
  }
}
