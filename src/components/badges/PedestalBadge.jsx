import React from 'react';

export const PedestalBadge = ({ level = 5, size = 120, showPedestal = true }) => {
  const padLevel = String(level).padStart(2, '0');

  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none"
      style={{ 
        width: size, 
        height: size * 1.25,
        filter: 'drop-shadow(0 14px 36px rgba(245, 158, 11, 0.6)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9))' 
      }}
    >
      <svg
        viewBox="0 0 150 180"
        width={size}
        height={size * 1.25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 24K Gold Gradients */}
          <linearGradient id="pedGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="20%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="pedGoldSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="pedGoldTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#FFFBEB" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <radialGradient id="pedCoreDark" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#1E2338" />
            <stop offset="65%" stopColor="#101322" />
            <stop offset="100%" stopColor="#080911" />
          </radialGradient>

          <linearGradient id="pedNumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="pedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="75" cy="70" r="50" fill="rgba(245, 158, 11, 0.25)" filter="url(#pedGlow)" />

        {/* Laurel Branches behind Shield */}
        <g fill="url(#pedGoldOuter)" opacity="0.9" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          {/* Left Laurel Leaves */}
          <path d="M 45 110 C 30 95, 22 75, 25 50 C 27 40, 36 28, 48 20 C 45 30, 40 42, 42 56 C 42 74, 50 92, 58 102 Z" />
          <ellipse cx="22" cy="85" rx="5" ry="11" transform="rotate(-30 22 85)" />
          <ellipse cx="20" cy="65" rx="5" ry="11" transform="rotate(-15 20 65)" />
          <ellipse cx="28" cy="46" rx="4.5" ry="10" transform="rotate(5 28 46)" />
          <ellipse cx="42" cy="30" rx="4" ry="9" transform="rotate(25 42 30)" />

          {/* Right Laurel Leaves */}
          <path d="M 105 110 C 120 95, 128 75, 125 50 C 123 40, 114 28, 102 20 C 105 30, 110 42, 108 56 C 108 74, 100 92, 92 102 Z" />
          <ellipse cx="128" cy="85" rx="5" ry="11" transform="rotate(30 128 85)" />
          <ellipse cx="130" cy="65" rx="5" ry="11" transform="rotate(15 130 65)" />
          <ellipse cx="122" cy="46" rx="4.5" ry="10" transform="rotate(-5 122 46)" />
          <ellipse cx="108" cy="30" rx="4" ry="9" transform="rotate(-25 108 30)" />
        </g>

        {/* ================= 3D GOLDEN OCTAGONAL SHIELD ================= */}
        {/* Layer 1: Outer Chamfer Base */}
        <polygon
          points="54,16 96,16 122,42 122,84 96,110 54,110 28,84 28,42"
          fill="url(#pedGoldOuter)"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))' }}
        />
        {/* Layer 2: Recessed Dark Gap */}
        <polygon
          points="55,18 95,18 119,42 119,84 95,108 55,108 31,84 31,42"
          fill="#0A0C14"
        />
        {/* Layer 3: Inner Gold Rim */}
        <polygon
          points="57,20 93,20 116,43 116,83 93,106 57,106 34,83 34,43"
          fill="url(#pedGoldTop)"
        />
        {/* Layer 4: Deep Obsidian Core */}
        <polygon
          points="59,23 91,23 113,45 113,81 91,103 59,103 37,81 37,45"
          fill="url(#pedCoreDark)"
        />

        {/* 3 Stars Top */}
        <g fill="#FDE047">
          <path d="M75 28 L76 30.5 L79 30.5 L76.6 32.2 L77.5 35 L75 33.2 L72.5 35 L73.4 32.2 L71 30.5 L74 30.5 Z" />
          <path d="M64 30 L64.8 32 L67 32 L65.2 33.3 L66 35.5 L64 34 L62 35.5 L62.8 33.3 L61 32 L63.2 32 Z" opacity="0.85" />
          <path d="M86 30 L86.8 32 L89 32 L87.2 33.3 L88 35.5 L86 34 L84 35.5 L84.8 33.3 L83 32 L85.2 32 Z" opacity="0.85" />
        </g>

        {/* Tag: LEVEL */}
        <text
          x="75"
          y="48"
          textAnchor="middle"
          fill="#FDE68A"
          fontSize="8"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}
        >
          LEVEL
        </text>

        {/* Bold 05 Numerals */}
        <text
          x="75"
          y="81"
          textAnchor="middle"
          fill="url(#pedNumGrad)"
          fontSize="31"
          fontWeight="900"
          letterSpacing="-0.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ 
            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.45))' 
          }}
        >
          {padLevel}
        </text>

        {/* Bottom Accent */}
        <path d="M62 88 L88 88 L84 92 L66 92 Z" fill="url(#pedGoldOuter)" />
        <circle cx="75" cy="90" r="1.5" fill="#FFFFFF" />

        {/* ================= 3D GOLDEN CYLINDRICAL STAGE PEDESTAL ================= */}
        {showPedestal && (
          <g style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.9))' }}>
            {/* Step 1: Base Tier (Widest) */}
            <path
              d="M 15 152 C 15 142, 135 142, 135 152 L 135 165 C 135 175, 15 175, 15 165 Z"
              fill="url(#pedGoldSide)"
            />
            <ellipse cx="75" cy="152" rx="60" ry="11" fill="url(#pedGoldTop)" />
            <ellipse cx="75" cy="152" rx="57" ry="9" fill="#0A0C14" opacity="0.8" />

            {/* Step 2: Middle Tier */}
            <path
              d="M 28 132 C 28 124, 122 124, 122 132 L 122 144 C 122 152, 28 152, 28 144 Z"
              fill="url(#pedGoldSide)"
            />
            <ellipse cx="75" cy="132" rx="47" ry="9" fill="url(#pedGoldTop)" />

            {/* Step 3: Top Dais Ring (Right under shield) */}
            <path
              d="M 40 114 C 40 107, 110 107, 110 114 L 110 124 C 110 131, 40 131, 40 124 Z"
              fill="url(#pedGoldSide)"
            />
            <ellipse cx="75" cy="114" rx="35" ry="7" fill="url(#pedGoldTop)" />

            {/* Pedestal Rim Glow Highlight */}
            <ellipse cx="75" cy="114" rx="33" ry="5.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
export default PedestalBadge;
