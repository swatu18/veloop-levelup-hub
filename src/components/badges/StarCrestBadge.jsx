import React from 'react';

export const StarCrestBadge = ({ size = 150 }) => {
  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 160 175"
        width={size}
        height={size * 1.15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 12px 28px rgba(245, 158, 11, 0.5))' }}
      >
        <defs>
          <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="starFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="starFacetDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="crestPedestalTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF9C3" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="crestPedestalSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <radialGradient id="crestCore" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1E2338" />
            <stop offset="70%" stopColor="#101322" />
            <stop offset="100%" stopColor="#080911" />
          </radialGradient>

          <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Warm Golden Halo */}
        <circle cx="80" cy="72" r="50" fill="rgba(245, 158, 11, 0.2)" filter="url(#starGlow)" />

        {/* Floating Confetti Elements around Crest */}
        <rect x="22" y="24" width="4" height="6" rx="1.5" transform="rotate(25 22 24)" fill="#38BDF8" opacity="0.8" />
        <rect x="135" y="32" width="5" height="4" rx="1.5" transform="rotate(-35 135 32)" fill="#F59E0B" opacity="0.9" />
        <rect x="18" y="68" width="5" height="3" rx="1" transform="rotate(45 18 68)" fill="#F43F5E" opacity="0.75" />
        <rect x="142" y="76" width="4" height="6" rx="1.5" transform="rotate(15 142 76)" fill="#38BDF8" opacity="0.8" />
        <circle cx="28" cy="46" r="2" fill="#FDE047" />
        <circle cx="132" cy="58" r="2.5" fill="#FFFFFF" />

        {/* --- 3D SCULPTED GOLDEN CIRCULAR PEDESTAL (DAIS) --- */}
        <g transform="translate(0, 32)">
          {/* Bottom Rim */}
          <ellipse cx="80" cy="120" rx="58" ry="14" fill="url(#crestPedestalSide)" />
          <ellipse cx="80" cy="115" rx="58" ry="13" fill="url(#crestPedestalTop)" />

          {/* Middle Step */}
          <ellipse cx="80" cy="112" rx="48" ry="10.5" fill="url(#crestPedestalSide)" />
          <ellipse cx="80" cy="108" rx="48" ry="10" fill="url(#crestPedestalTop)" />

          {/* Top Step */}
          <ellipse cx="80" cy="105" rx="38" ry="8" fill="url(#crestPedestalSide)" />
          <ellipse cx="80" cy="102" rx="38" ry="7.5" fill="#FEF08A" opacity="0.95" />

          {/* Contact Shadow */}
          <ellipse cx="80" cy="102" rx="28" ry="5.5" fill="#000000" opacity="0.7" />
        </g>

        {/* --- GOLDEN LAUREL LEAF ARCS --- */}
        <g fill="url(#starGold)">
          {/* Left Laurel Sprigs */}
          <path d="M 40 105 C 22 92, 16 68, 22 45 C 28 58, 38 72, 50 82 Z" opacity="0.85" />
          <ellipse cx="20" cy="74" rx="5" ry="11" transform="rotate(-25 20 74)" />
          <ellipse cx="23" cy="54" rx="4.5" ry="10" transform="rotate(-15 23 54)" />
          <ellipse cx="32" cy="36" rx="4" ry="9" transform="rotate(-5 32 36)" />
          <ellipse cx="46" cy="22" rx="4" ry="8" transform="rotate(15 46 22)" />

          {/* Right Laurel Sprigs */}
          <path d="M 120 105 C 138 92, 144 68, 138 45 C 132 58, 122 72, 110 82 Z" opacity="0.85" />
          <ellipse cx="140" cy="74" rx="5" ry="11" transform="rotate(25 140 74)" />
          <ellipse cx="137" cy="54" rx="4.5" ry="10" transform="rotate(15 137 54)" />
          <ellipse cx="128" cy="36" rx="4" ry="9" transform="rotate(5 128 36)" />
          <ellipse cx="114" cy="22" rx="4" ry="8" transform="rotate(-15 114 22)" />
        </g>

        {/* --- DUAL GOLD HEX SHIELD --- */}
        {/* Outer Heavy Hex Border */}
        {/* Points: (48,15), (112,15), (142,65), (112,115), (48,115), (18,65) */}
        <polygon
          points="48,15 112,15 142,65 112,115 48,115 18,65"
          fill="url(#starGold)"
        />

        {/* Inset Dark Separation Ring */}
        <polygon
          points="50,18 110,18 138,65 110,112 50,112 22,65"
          fill="#0B0D16"
        />

        {/* Inner Gold Rim */}
        <polygon
          points="52,21 108,21 134,65 108,109 52,109 26,65"
          fill="url(#starGold)"
        />

        {/* Shield Obsidian Core Face */}
        <polygon
          points="54,24 106,24 130,65 106,106 54,106 30,65"
          fill="url(#crestCore)"
        />

        {/* --- GIANT 3D MULTI-FACETED GOLD STAR --- */}
        {/* Star center: (80, 65). Star radius outer ~38, inner ~16 */}
        {/* Points: Top(80, 27), Top-Right(116, 53), Bottom-Right(102, 95), Bottom-Left(58, 95), Top-Left(44, 53) */}
        {/* In-between valley points: (91, 53), (92, 73), (80, 81), (68, 73), (69, 53) */}
        <g style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.85))' }}>
          {/* Top Arm */}
          <polygon points="80,27 80,65 91,53" fill="url(#starFacetLight)" />
          <polygon points="80,27 80,65 69,53" fill="url(#starFacetDark)" />

          {/* Top-Right Arm */}
          <polygon points="116,53 80,65 91,53" fill="url(#starFacetLight)" />
          <polygon points="116,53 80,65 92,73" fill="url(#starFacetDark)" />

          {/* Bottom-Right Arm */}
          <polygon points="102,95 80,65 92,73" fill="url(#starFacetLight)" />
          <polygon points="102,95 80,65 80,81" fill="url(#starFacetDark)" />

          {/* Bottom-Left Arm */}
          <polygon points="58,95 80,65 80,81" fill="url(#starFacetLight)" />
          <polygon points="58,95 80,65 68,73" fill="url(#starFacetDark)" />

          {/* Top-Left Arm */}
          <polygon points="44,53 80,65 68,73" fill="url(#starFacetLight)" />
          <polygon points="44,53 80,65 69,53" fill="url(#starFacetDark)" />

          {/* Center Jewel Highlight */}
          <circle cx="80" cy="65" r="3.5" fill="#FFFFFF" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};
export default StarCrestBadge;
