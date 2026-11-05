import React from "react";

interface Category3DIconProps {
  type: string;
  className?: string;
}

export default function Category3DIcon({ type, className = "w-11 h-11" }: Category3DIconProps) {
  switch (type) {
    case "fashion-3d":
    case "fashion":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="shirt-grad" x1="16" y1="14" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7F56D9" />
              <stop offset="50%" stopColor="#53B1FD" />
              <stop offset="100%" stopColor="#3538CD" />
            </linearGradient>
            <linearGradient id="sparkle-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDB022" />
              <stop offset="100%" stopColor="#FEE4E2" />
            </linearGradient>
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" floodColor="#1e1b4b" />
            </filter>
          </defs>
          {/* T-Shirt Body with 3D Fold */}
          <g filter="url(#soft-shadow)">
            <path
              d="M22 17L12 24L17 33L23 29V50C23 52.2 24.8 54 27 54H43C45.2 54 47 52.2 47 50V29L53 33L58 24L48 17C45 22 31 22 28 17H22Z"
              fill="url(#shirt-grad)"
            />
            {/* Collar Highlight */}
            <path
              d="M28 17C30 22 40 22 42 17"
              stroke="#B2CCFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Fold shadow */}
            <path d="M23 29L28 32V50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            {/* Sparkle 1 */}
            <path
              d="M13 14L14.5 18L18.5 19.5L14.5 21L13 25L11.5 21L7.5 19.5L11.5 18L13 14Z"
              fill="url(#sparkle-grad)"
            />
            {/* Sparkle 2 */}
            <path
              d="M51 38L52 41L55 42L52 43L51 46L50 43L47 42L50 41L51 38Z"
              fill="#FDB022"
            />
          </g>
        </svg>
      );

    case "household-3d":
    case "household":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="sofa-main" x1="12" y1="16" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDB022" />
              <stop offset="60%" stopColor="#F79009" />
              <stop offset="100%" stopColor="#DC6803" />
            </linearGradient>
            <linearGradient id="sofa-cushion" x1="20" y1="28" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEDF89" />
              <stop offset="100%" stopColor="#F79009" />
            </linearGradient>
            <filter id="sofa-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" floodColor="#7A2E0E" />
            </filter>
          </defs>
          <g filter="url(#sofa-shadow)">
            {/* Wooden Legs */}
            <line x1="16" y1="46" x2="13" y2="54" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="46" x2="51" y2="54" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            {/* Armchair Backrest */}
            <rect x="18" y="15" width="28" height="26" rx="8" fill="url(#sofa-main)" />
            {/* Left Armrest */}
            <rect x="11" y="27" width="10" height="21" rx="5" fill="url(#sofa-main)" />
            {/* Right Armrest */}
            <rect x="43" y="27" width="10" height="21" rx="5" fill="url(#sofa-main)" />
            {/* Plump Seat Cushion */}
            <rect x="17" y="32" width="30" height="15" rx="6" fill="url(#sofa-cushion)" />
            {/* Soft highlight */}
            <path d="M21 21C26 19 38 19 43 21" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "personal-care-3d":
    case "personal-care":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="jar-body" x1="16" y1="24" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="lid-metal" x1="14" y1="16" x2="50" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="jar-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" floodColor="#854D0E" />
            </filter>
          </defs>
          <g filter="url(#jar-shadow)">
            {/* Glass Jar Body */}
            <rect x="16" y="28" width="32" height="24" rx="7" fill="url(#jar-body)" stroke="#EAB308" strokeWidth="1" />
            {/* Cream Level inner swell */}
            <ellipse cx="32" cy="30" rx="14" ry="5" fill="#FEF9C3" />
            {/* Chrome Metallic Lid */}
            <ellipse cx="32" cy="23" rx="17" ry="6" fill="url(#lid-metal)" />
            <path d="M15 23V20C15 17 22.6 15 32 15C41.4 15 49 17 49 20V23" fill="url(#lid-metal)" />
            <ellipse cx="32" cy="18" rx="15" ry="4.5" fill="#F8FAFC" />
            {/* Gloss reflection */}
            <path d="M21 34V46" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "health-3d":
    case "health":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="heart-red" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="60%" stopColor="#E60000" />
              <stop offset="100%" stopColor="#990000" />
            </linearGradient>
            <filter id="heart-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodOpacity="0.4" floodColor="#7F1D1D" />
            </filter>
          </defs>
          <g filter="url(#heart-glow)">
            {/* 3D Glossy Heart */}
            <path
              d="M32 52C32 52 14 38 14 24C14 17.4 19.4 12 26 12C29.6 12 32 14 32 14C32 14 34.4 12 38 12C44.6 12 50 17.4 50 24C50 38 32 52 32 52Z"
              fill="url(#heart-red)"
            />
            {/* Top Gloss highlight */}
            <path
              d="M20 18C23 15 27 15 28 17"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Glowing White ECG Pulse line */}
            <path
              d="M17 28H24L27 20L31 36L35 24L38 30L41 28H47"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case "groceries-3d":
    case "groceries":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="bag-grad" x1="18" y1="20" x2="46" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <filter id="grocery-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" floodColor="#451A03" />
            </filter>
          </defs>
          <g filter="url(#grocery-shadow)">
            {/* Fresh Greens & Apple poking out */}
            <circle cx="27" cy="19" r="6" fill="#EF4444" />
            <path d="M33 13C33 13 37 11 39 15C41 19 37 21 37 21" fill="#10B981" />
            <path d="M21 16C21 16 19 12 24 12C29 12 27 18 27 18" fill="#34D399" />
            {/* Kraft Paper Bag */}
            <path
              d="M18 22H46L43 52H21L18 22Z"
              fill="url(#bag-grad)"
            />
            {/* Bag Fold Top */}
            <path d="M18 22L20 26H44L46 22" fill="#B45309" />
            {/* Bag central indent fold */}
            <line x1="32" y1="26" x2="32" y2="52" stroke="#78350F" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </svg>
      );

    case "dine-out-3d":
    case "dine-out":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="cloche-silver" x1="16" y1="18" x2="48" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="40%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <filter id="cloche-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" floodColor="#334155" />
            </filter>
          </defs>
          <g filter="url(#cloche-shadow)">
            {/* Handle knob */}
            <circle cx="32" cy="18" r="3.5" fill="#94A3B8" />
            {/* Serving Cloche Dome */}
            <path
              d="M16 40C16 26.7 23.2 21 32 21C40.8 21 48 26.7 48 40H16Z"
              fill="url(#cloche-silver)"
            />
            {/* Gloss shine */}
            <path
              d="M23 27C27 24 33 24 36 26"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Silver Tray Platter */}
            <rect x="12" y="40" width="40" height="5" rx="2.5" fill="#E2E8F0" />
            <rect x="15" y="45" width="34" height="2" rx="1" fill="#94A3B8" />
          </g>
        </svg>
      );

    case "electronics-3d":
    case "electronics":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="phone-grad" x1="18" y1="14" x2="42" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <filter id="phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" floodColor="#1E1B4B" />
            </filter>
          </defs>
          <g filter="url(#phone-shadow)">
            {/* Smartphone Body */}
            <rect x="20" y="14" width="24" height="38" rx="5" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <rect x="22" y="17" width="20" height="32" rx="3" fill="url(#phone-grad)" />
            {/* Dynamic island / speaker pill */}
            <rect x="28" y="19" width="8" height="2.5" rx="1.25" fill="#0F172A" />
            {/* Screen shine */}
            <path d="M24 22L36 34" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "tickets-3d":
    case "tickets":
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="ticket-grad" x1="14" y1="20" x2="50" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <filter id="ticket-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" floodColor="#881337" />
            </filter>
          </defs>
          <g filter="url(#ticket-shadow)">
            {/* VIP Pass Ticket */}
            <path
              d="M16 22C16 24.2 14.2 26 12 26V38C14.2 38 16 39.8 16 42H48C48 39.8 49.8 38 52 38V26C49.8 26 48 24.2 48 22H16Z"
              fill="url(#ticket-grad)"
            />
            {/* Perforation line */}
            <line x1="26" y1="24" x2="26" y2="40" stroke="#FFE4E6" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Star badge */}
            <path
              d="M37 28L38.2 31.8H42L39 34.2L40.2 38L37 35.6L33.8 38L35 34.2L32 31.8H35.8L37 28Z"
              fill="#FDE047"
            />
          </g>
        </svg>
      );
  }
}
