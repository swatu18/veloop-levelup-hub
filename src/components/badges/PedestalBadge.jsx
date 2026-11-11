import React from 'react';

export const PedestalBadge = ({ level = 5, size = 110, showPedestal = true }) => {
  const padLevel = String(level).padStart(2, '0');

  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 120 140"
        width={size}
        height={size * 1.15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(245, 158, 11, 0.4))' }}
      >
        <defs>
          {/* Rich 24K Gold Gradients */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="25%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="goldInnerBevel" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="pedestalGoldTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF9C3" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="pedestalGoldSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Deep Obsidian Core Face */}
          <radialGradient id="badgeCore" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#1E2338" />
            <stop offset="65%" stopColor="#101322" />
            <stop offset="100%" stopColor="#080911" />
          </radialGradient>

          {/* Text Gradient */}
          <linearGradient id="goldNumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF3C7" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- 3D SCULPTED GOLDEN CIRCULAR PEDESTAL (DAIS) --- */}
        {showPedestal && (
          <g transform="translate(0, 18)">
            {/* Outer Bottom Base Rim */}
            <ellipse cx="60" cy="104" rx="46" ry="11" fill="url(#pedestalGoldSide)" />
            <ellipse cx="60" cy="100" rx="46" ry="10.5" fill="url(#pedestalGoldTop)" />

            {/* Middle Step */}
            <ellipse cx="60" cy="98" rx="38" ry="8.5" fill="url(#pedestalGoldSide)" />
            <ellipse cx="60" cy="95" rx="38" ry="8" fill="url(#pedestalGoldTop)" />

            {/* Top Step Rim */}
            <ellipse cx="60" cy="93" rx="30" ry="6.5" fill="url(#pedestalGoldSide)" />
            <ellipse cx="60" cy="90" rx="30" ry="6" fill="#FEF08A" opacity="0.9" />

            {/* Under-badge Contact Shadow */}
            <ellipse cx="60" cy="90" rx="22" ry="4.5" fill="#000000" opacity="0.65" />
          </g>
        )}

        {/* --- MAIN OCTAGONAL / HEXAGON GOLD SHIELD --- */}
        {/* Points for sharp beveled shield: (36,8), (84,8), (110,40), (110,72), (84,100), (36,100), (10,72), (10,40) */}
        {/* Outer Heavy Gold Bevel */}
        <polygon
          points="36,8 84,8 110,40 110,72 84,100 36,100 10,72 10,40"
          fill="url(#goldRim)"
        />

        {/* Inset Dark Separation Groove */}
        <polygon
          points="37,11 83,11 107,41 107,71 83,97 37,97 13,71 13,41"
          fill="#0B0D16"
        />

        {/* Inner Gold Rim */}
        <polygon
          points="38,13 82,13 104,42 104,70 82,95 38,95 16,70 16,42"
          fill="url(#goldInnerBevel)"
        />

        {/* Core Obsidian Face */}
        <polygon
          points="39,15 81,15 101,43 101,68 81,92 39,92 19,68 19,43"
          fill="url(#badgeCore)"
        />

        {/* Subtle Diamond Facet Sheen across core */}
        <polygon points="60,16 81,15 101,43 60,54" fill="#252D4A" opacity="0.4" />
        <polygon points="60,16 19,43 39,15" fill="#1C2238" opacity="0.5" />
        <polygon points="19,43 60,54 19,68" fill="#3B82F6" opacity="0.12" />
        <polygon points="101,43 60,54 101,68" fill="#60A5FA" opacity="0.1" />

        {/* Header Label: "LEVEL" */}
        <text
          x="60"
          y="38"
          textAnchor="middle"
          fill="#FEF08A"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="2.8"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}
        >
          LEVEL
        </text>

        {/* Big Bold Numerals: "05" */}
        <text
          x="60"
          y="74"
          textAnchor="middle"
          fill="url(#goldNumGrad)"
          fontSize="35"
          fontWeight="900"
          letterSpacing="-1.5"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.9))' }}
        >
          {padLevel}
        </text>

        {/* Bottom Gold Winglets / Laurel Accent */}
        <g fill="url(#goldRim)">
          {/* Left Winglet */}
          <path d="M 12 70 C 2 76, 0 88, 8 96 C 14 96, 20 88, 22 78 Z" opacity="0.95" />
          <path d="M 8 78 C 0 82, -2 92, 4 98 C 9 98, 14 92, 16 84 Z" opacity="0.75" />
          {/* Right Winglet */}
          <path d="M 108 70 C 118 76, 120 88, 112 96 C 106 96, 100 88, 98 78 Z" opacity="0.95" />
          <path d="M 112 78 C 120 82, 122 92, 116 98 C 111 98, 106 92, 104 84 Z" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
};
export default PedestalBadge;
