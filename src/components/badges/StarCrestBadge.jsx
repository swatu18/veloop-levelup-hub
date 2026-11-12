import React from 'react';

export const StarCrestBadge = ({ size = 155 }) => {
  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      style={{ 
        width: size, 
        height: size * 1.15,
        filter: 'drop-shadow(0 14px 32px rgba(245, 158, 11, 0.55)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.9))' 
      }}
    >
      <svg
        viewBox="0 0 170 190"
        width={size}
        height={size * 1.15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 24K Polished Gold Wreath Gradient */}
          <linearGradient id="crestWreathGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="20%" stopColor="#FDE047" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Faceted Star Light & Shadow */}
          <linearGradient id="crestStarFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="crestStarFacetDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Medallion Outer Gold Rim */}
          <linearGradient id="crestMedallionRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="75%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Medallion Core Face */}
          <radialGradient id="crestMedallionCore" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#252C46" />
            <stop offset="55%" stopColor="#121524" />
            <stop offset="100%" stopColor="#080911" />
          </radialGradient>

          {/* Ambient Glow */}
          <filter id="crestGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Warm Golden Aura */}
        <circle cx="85" cy="85" r="58" fill="rgba(245, 158, 11, 0.22)" filter="url(#crestGlow)" />

        {/* ================= LEFT LAUREL BRANCH WREATH ================= */}
        <g fill="url(#crestWreathGold)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}>
          {/* Main stem arch */}
          <path d="M 52 145 C 32 130, 20 100, 24 70 C 26 50, 38 32, 54 20 C 50 30, 42 45, 42 65 C 40 90, 52 120, 64 135 Z" opacity="0.95" />
          {/* Laurel leaves clusters */}
          <ellipse cx="20" cy="115" rx="6" ry="14" transform="rotate(-40 20 115)" />
          <ellipse cx="15" cy="92" rx="6.5" ry="15" transform="rotate(-25 15 92)" />
          <ellipse cx="18" cy="68" rx="6" ry="14" transform="rotate(-12 18 68)" />
          <ellipse cx="28" cy="46" rx="5.5" ry="13" transform="rotate(8 28 46)" />
          <ellipse cx="44" cy="28" rx="5" ry="12" transform="rotate(28 44 28)" />
          <ellipse cx="64" cy="18" rx="4.5" ry="10" transform="rotate(48 64 18)" />

          {/* Inset smaller leaves */}
          <ellipse cx="32" cy="105" rx="4.5" ry="10" transform="rotate(-30 32 105)" opacity="0.85" />
          <ellipse cx="28" cy="82" rx="5" ry="11" transform="rotate(-18 28 82)" opacity="0.85" />
          <ellipse cx="32" cy="60" rx="4.5" ry="10" transform="rotate(-5 32 60)" opacity="0.85" />
          <ellipse cx="42" cy="42" rx="4" ry="9" transform="rotate(15 42 42)" opacity="0.85" />
        </g>

        {/* ================= RIGHT LAUREL BRANCH WREATH ================= */}
        <g fill="url(#crestWreathGold)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}>
          {/* Main stem arch */}
          <path d="M 118 145 C 138 130, 150 100, 146 70 C 144 50, 132 32, 116 20 C 120 30, 128 45, 128 65 C 130 90, 118 120, 106 135 Z" opacity="0.95" />
          {/* Laurel leaves clusters */}
          <ellipse cx="150" cy="115" rx="6" ry="14" transform="rotate(40 150 115)" />
          <ellipse cx="155" cy="92" rx="6.5" ry="15" transform="rotate(25 155 92)" />
          <ellipse cx="152" cy="68" rx="6" ry="14" transform="rotate(12 152 68)" />
          <ellipse cx="142" cy="46" rx="5.5" ry="13" transform="rotate(-8 142 46)" />
          <ellipse cx="126" cy="28" rx="5" ry="12" transform="rotate(-28 126 28)" />
          <ellipse cx="106" cy="18" rx="4.5" ry="10" transform="rotate(-48 106 18)" />

          {/* Inset smaller leaves */}
          <ellipse cx="138" cy="105" rx="4.5" ry="10" transform="rotate(30 138 105)" opacity="0.85" />
          <ellipse cx="142" cy="82" rx="5" ry="11" transform="rotate(18 142 82)" opacity="0.85" />
          <ellipse cx="138" cy="60" rx="4.5" ry="10" transform="rotate(5 138 60)" opacity="0.85" />
          <ellipse cx="128" cy="42" rx="4" ry="9" transform="rotate(-15 128 42)" opacity="0.85" />
        </g>

        {/* ================= CENTER MEDALLION ================= */}
        {/* Outer Bevel Ring */}
        <circle cx="85" cy="85" r="48" fill="url(#crestMedallionRim)" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.8))' }} />
        <circle cx="85" cy="85" r="44" fill="#0A0C14" />
        {/* Inner Gold Bevel Rim */}
        <circle cx="85" cy="85" r="42" fill="url(#crestWreathGold)" />
        <circle cx="85" cy="85" r="39" fill="url(#crestMedallionCore)" />

        {/* Circular Studs / Rivets on Bevel */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 85 + 40.5 * Math.cos(rad);
          const cy = 85 + 40.5 * Math.sin(rad);
          return (
            <circle key={i} cx={cx} cy={cy} r="1.3" fill="#FFFFFF" opacity="0.9" />
          );
        })}

        {/* ================= 3D FACETED GOLDEN STAR ================= */}
        <g style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.9))' }}>
          {/* Top Tip */}
          <polygon points="85,50 85,85 71,76" fill="url(#crestStarFacetLight)" />
          <polygon points="85,50 99,76 85,85" fill="url(#crestStarFacetDark)" />

          {/* Top Right Tip */}
          <polygon points="120,74 85,85 99,76" fill="url(#crestStarFacetLight)" />
          <polygon points="120,74 94,95 85,85" fill="url(#crestStarFacetDark)" />

          {/* Bottom Right Tip */}
          <polygon points="107,112 85,85 94,95" fill="url(#crestStarFacetLight)" />
          <polygon points="107,112 85,100 85,85" fill="url(#crestStarFacetDark)" />

          {/* Bottom Left Tip */}
          <polygon points="63,112 85,100 85,85" fill="url(#crestStarFacetLight)" />
          <polygon points="63,112 85,85 76,95" fill="url(#crestStarFacetDark)" />

          {/* Top Left Tip */}
          <polygon points="50,74 85,85 76,95" fill="url(#crestStarFacetLight)" />
          <polygon points="50,74 71,76 85,85" fill="url(#crestStarFacetDark)" />

          {/* Center Specular Glint */}
          <circle cx="85" cy="85" r="2.5" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* ================= BOTTOM DAIS / RIBBON TIE ================= */}
        <g style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))' }}>
          {/* Ribbon arch */}
          <path
            d="M 60 148 L 110 148 L 118 162 L 85 158 L 52 162 Z"
            fill="url(#crestMedallionRim)"
          />
          <path
            d="M 64 150 L 106 150 L 112 160 L 85 156 L 58 160 Z"
            fill="url(#crestStarFacetLight)"
            opacity="0.85"
          />
          {/* Central Gold Knot / Gem */}
          <circle cx="85" cy="154" r="5" fill="url(#crestWreathGold)" />
          <circle cx="85" cy="154" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
export default StarCrestBadge;
