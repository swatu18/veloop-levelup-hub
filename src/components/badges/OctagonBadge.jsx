import React from 'react';

export const OctagonBadge = ({ level = 5, size = 88, className = '' }) => {
  const padLevel = String(level).padStart(2, '0');
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, filter: 'drop-shadow(0 6px 14px rgba(245, 158, 11, 0.35))' }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Gold Bevel */}
          <linearGradient id="goldOuterBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="75%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Inner Gold Rim */}
          <linearGradient id="goldInnerRim" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Core Obsidian Dark Shield */}
          <radialGradient id="coreObsidian" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#1E2336" />
            <stop offset="60%" stopColor="#11131F" />
            <stop offset="100%" stopColor="#0B0C14" />
          </radialGradient>

          {/* Diamond Facet Highlights */}
          <linearGradient id="diamondSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
          </linearGradient>

          {/* Gold Text Gradient */}
          <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Octagon Chamfer Frame */}
        <polygon
          points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
          fill="url(#goldOuterBevel)"
        />

        {/* Secondary Inset Frame (Dark Gap) */}
        <polygon
          points="31,7 69,7 93,31 93,69 69,93 31,93 7,69 7,31"
          fill="#0D0F18"
        />

        {/* Inner Gold Rim */}
        <polygon
          points="32,9 68,9 91,32 91,68 68,91 32,91 9,68 9,32"
          fill="url(#goldInnerRim)"
        />

        {/* Main Core Face (Dark Metallic Indigo-Obsidian) */}
        <polygon
          points="33,12 67,12 88,33 88,67 67,88 33,88 12,67 12,33"
          fill="url(#coreObsidian)"
        />

        {/* Geometric Diamond Faceting on Core */}
        <polygon points="50,14 67,33 50,42 33,33" fill="#252A40" opacity="0.6" />
        <polygon points="50,14 50,42 33,33" fill="#2E3550" opacity="0.4" />
        <polygon points="14,40 33,33 50,42 33,67 14,60" fill="url(#diamondSheen)" />
        <polygon points="86,40 67,33 50,42 67,67 86,60" fill="url(#diamondSheen)" />

        {/* 3 Golden Stars Top Arc */}
        <path d="M50 20 L51.2 23 L54.5 23 L52 25 L53 28 L50 26 L47 28 L48 25 L45.5 23 L48.8 23 Z" fill="#FDE047" />
        <path d="M40 23 L40.8 25 L43 25 L41.2 26.5 L42 28.5 L40 27.2 L38 28.5 L38.8 26.5 L37 25 L39.2 25 Z" fill="#F59E0B" opacity="0.85" />
        <path d="M60 23 L60.8 25 L63 25 L61.2 26.5 L62 28.5 L60 27.2 L58 28.5 L58.8 26.5 L57 25 L59.2 25 Z" fill="#F59E0B" opacity="0.85" />

        {/* Arc Banner / Header Text "LEVEL" */}
        <text
          x="50"
          y="39"
          textAnchor="middle"
          fill="#FDE68A"
          fontSize="8"
          fontWeight="800"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          LEVEL
        </text>

        {/* Main Big Numerals "05" */}
        <text
          x="50"
          y="69"
          textAnchor="middle"
          fill="url(#goldTextGrad)"
          fontSize="29"
          fontWeight="900"
          letterSpacing="-0.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.8))' }}
        >
          {padLevel}
        </text>

        {/* Bottom Mini Pedestal Banner Accent */}
        <path
          d="M38 76 L62 76 L58 81 L42 81 Z"
          fill="url(#goldOuterBevel)"
        />
        <circle cx="50" cy="78.5" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
export default OctagonBadge;
