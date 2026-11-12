import React from 'react';

export const OctagonBadge = ({ level = 5, size = 96, className = '' }) => {
  const padLevel = String(level).padStart(2, '0');
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none transition-transform hover:scale-105 ${className}`}
      style={{ 
        width: size, 
        height: size, 
        filter: 'drop-shadow(0 10px 24px rgba(245, 158, 11, 0.45)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8))' 
      }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Primary 24K Gold Outer Bevel */}
          <linearGradient id="octGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="15%" stopColor="#FDE047" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#B45309" />
            <stop offset="75%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Deep Metallic Bevel Reflection */}
          <linearGradient id="octGoldInnerBevel" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#92400E" />
            <stop offset="85%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Core Dark Obsidian Shield */}
          <radialGradient id="octObsidianCore" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#1E2338" />
            <stop offset="50%" stopColor="#101322" />
            <stop offset="85%" stopColor="#080911" />
            <stop offset="100%" stopColor="#040508" />
          </radialGradient>

          {/* Specular Diagonal Sheen */}
          <linearGradient id="octSpecularSheen" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          {/* Bold 3D Gold Typography Gradient */}
          <linearGradient id="octNumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Ambient Glow */}
          <filter id="goldAura" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="60" cy="60" r="46" fill="rgba(245, 158, 11, 0.2)" filter="url(#goldAura)" />

        {/* Layer 1: Heavy Chamfered Octagon Outer Base */}
        <polygon
          points="35,4 85,4 116,35 116,85 85,116 35,116 4,85 4,35"
          fill="url(#octGoldOuter)"
        />

        {/* Layer 2: Recessed Dark Gap */}
        <polygon
          points="36,7 84,7 113,36 113,84 84,113 36,113 7,84 7,36"
          fill="#0A0C14"
        />

        {/* Layer 3: Raised Inner Gold Beveled Rim */}
        <polygon
          points="38,10 82,10 110,38 110,82 82,110 38,110 10,82 10,38"
          fill="url(#octGoldInnerBevel)"
        />

        {/* Layer 4: Deep Obsidian Core Face */}
        <polygon
          points="40,13 80,13 107,40 107,80 80,107 40,107 13,80 13,40"
          fill="url(#octObsidianCore)"
        />

        {/* Facet Highlights (3D Diamond Cut Shading) */}
        <polygon points="60,14 80,40 60,50 40,40" fill="#2E3550" opacity="0.45" />
        <polygon points="40,40 60,50 40,80 14,60" fill="url(#octSpecularSheen)" />
        <polygon points="80,40 106,60 80,80 60,50" fill="url(#octSpecularSheen)" opacity="0.4" />
        <polygon points="40,106 80,106 60,95" fill="#151928" opacity="0.6" />

        {/* Top 3 Stars Medallion */}
        <g fill="#FDE047">
          {/* Center Star */}
          <path d="M60 21 L61.5 24.5 L65.5 24.5 L62.3 27 L63.5 31 L60 28.5 L56.5 31 L57.7 27 L54.5 24.5 L58.5 24.5 Z" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }} />
          {/* Left Star */}
          <path d="M47 24 L48 26.5 L51 26.5 L48.6 28.2 L49.5 31 L47 29.2 L44.5 31 L45.4 28.2 L43 26.5 L46 26.5 Z" opacity="0.85" />
          {/* Right Star */}
          <path d="M73 24 L74 26.5 L77 26.5 L74.6 28.2 L75.5 31 L73 29.2 L70.5 31 L71.4 28.2 L69 26.5 L72 26.5 Z" opacity="0.85" />
        </g>

        {/* Arched Tag: LEVEL */}
        <text
          x="60"
          y="46"
          textAnchor="middle"
          fill="#FDE68A"
          fontSize="9.5"
          fontWeight="900"
          letterSpacing="3"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))' }}
        >
          LEVEL
        </text>

        {/* Big 3D Bold Numerals: 05 */}
        <text
          x="60"
          y="83"
          textAnchor="middle"
          fill="url(#octNumGrad)"
          fontSize="36"
          fontWeight="900"
          letterSpacing="-1"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ 
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))' 
          }}
        >
          {padLevel}
        </text>

        {/* Bottom Gold Accent Bar */}
        <path
          d="M44 92 L76 92 L71 97 L49 97 Z"
          fill="url(#octGoldOuter)"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.7))' }}
        />
        <circle cx="60" cy="94.5" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
export default OctagonBadge;
