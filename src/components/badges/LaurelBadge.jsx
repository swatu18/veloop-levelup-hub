import React from 'react';

export const LaurelBadge = ({ level = 5, size = 130, subtitle = "CHAMPION" }) => {
  const padLevel = String(level).padStart(2, '0');

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size, filter: 'drop-shadow(0 10px 25px rgba(245, 158, 11, 0.45))' }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="laurelGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="shieldCore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2337" />
            <stop offset="50%" stopColor="#121524" />
            <stop offset="100%" stopColor="#0B0D16" />
          </linearGradient>

          <linearGradient id="ribbonGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="20%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="80%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="laurelGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Behind Glow */}
        <circle cx="80" cy="75" r="48" fill="rgba(245, 158, 11, 0.15)" filter="url(#laurelGlow)" />

        {/* LEFT LAUREL LEAVES WREATH */}
        <g fill="url(#laurelGold)">
          <path d="M 50 115 C 38 100, 32 85, 34 65 C 30 52, 38 42, 45 35 C 44 42, 40 50, 42 62 C 43 75, 52 92, 60 102 Z" opacity="0.9" />
          <path d="M 36 78 C 24 74, 20 62, 22 50 C 27 57, 34 66, 38 72 Z" />
          <path d="M 40 60 C 28 54, 25 40, 30 30 C 35 38, 40 48, 43 55 Z" />
          <path d="M 47 44 C 38 34, 38 22, 45 15 C 49 24, 50 33, 51 40 Z" />
          <path d="M 58 32 C 52 20, 56 10, 65 5 C 67 15, 64 24, 62 30 Z" />
          <ellipse cx="28" cy="92" rx="4" ry="9" transform="rotate(-35 28 92)" />
          <ellipse cx="24" cy="72" rx="4.5" ry="10" transform="rotate(-25 24 72)" />
          <ellipse cx="27" cy="52" rx="4" ry="9" transform="rotate(-15 27 52)" />
          <ellipse cx="36" cy="34" rx="3.5" ry="8" transform="rotate(-5 36 34)" />
          <ellipse cx="50" cy="20" rx="3.5" ry="7" transform="rotate(15 50 20)" />
        </g>

        {/* RIGHT LAUREL LEAVES WREATH */}
        <g fill="url(#laurelGold)">
          <path d="M 110 115 C 122 100, 128 85, 126 65 C 130 52, 122 42, 115 35 C 116 42, 120 50, 118 62 C 117 75, 108 92, 100 102 Z" opacity="0.9" />
          <path d="M 124 78 C 136 74, 140 62, 138 50 C 133 57, 126 66, 122 72 Z" />
          <path d="M 120 60 C 132 54, 135 40, 130 30 C 125 38, 120 48, 117 55 Z" />
          <path d="M 113 44 C 122 34, 122 22, 115 15 C 111 24, 110 33, 109 40 Z" />
          <path d="M 102 32 C 108 20, 104 10, 95 5 C 93 15, 96 24, 98 30 Z" />
          <ellipse cx="132" cy="92" rx="4" ry="9" transform="rotate(35 132 92)" />
          <ellipse cx="136" cy="72" rx="4.5" ry="10" transform="rotate(25 136 72)" />
          <ellipse cx="133" cy="52" rx="4" ry="9" transform="rotate(15 133 52)" />
          <ellipse cx="124" cy="34" rx="3.5" ry="8" transform="rotate(5 124 34)" />
          <ellipse cx="110" cy="20" rx="3.5" ry="7" transform="rotate(-15 110 20)" />
        </g>

        {/* CENTRAL SHIELD OUTLINE */}
        <path
          d="M 80 24 L 114 36 C 114 74, 102 106, 80 120 C 58 106, 46 74, 46 36 Z"
          fill="url(#laurelGold)"
        />
        <path
          d="M 80 28 L 111 39 C 111 72, 100 102, 80 115 C 60 102, 49 72, 49 39 Z"
          fill="#0D0E17"
        />
        <path
          d="M 80 30 L 109 41 C 109 70, 98 99, 80 112 C 62 99, 51 70, 51 41 Z"
          fill="url(#laurelGold)"
        />
        <path
          d="M 80 33 L 106 43 C 106 68, 96 95, 80 108 C 64 95, 54 68, 54 43 Z"
          fill="url(#shieldCore)"
        />

        <path d="M 80 33 L 106 43 L 80 72 Z" fill="#252D4A" opacity="0.4" />
        <path d="M 80 33 L 54 43 L 80 72 Z" fill="#1C2136" opacity="0.6" />

        {/* Top 3 Stars on Shield */}
        <path d="M 80 40 L 81.5 44 L 86 44 L 82.5 47 L 84 51 L 80 48.5 L 76 51 L 77.5 47 L 74 44 L 78.5 44 Z" fill="#FEF08A" />
        <path d="M 68 44 L 69 47 L 72.5 47 L 70 49 L 71 52 L 68 50.2 L 65 52 L 66 49 L 63.5 47 L 67 47 Z" fill="#F59E0B" />
        <path d="M 92 44 L 93 47 L 96.5 47 L 94 49 L 95 52 L 92 50.2 L 89 52 L 90 49 L 87.5 47 L 91 47 Z" fill="#F59E0B" />

        {/* "LEVEL" Banner Text */}
        <text
          x="80"
          y="62"
          textAnchor="middle"
          fill="#FDE68A"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          LEVEL
        </text>

        {/* Main Big Level Number "05" */}
        <text
          x="80"
          y="95"
          textAnchor="middle"
          fill="url(#laurelGold)"
          fontSize="35"
          fontWeight="900"
          letterSpacing="-1"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.9))' }}
        >
          {padLevel}
        </text>

        {/* BOTTOM CURVING BANNER RIBBON */}
        <g transform="translate(0, 10)">
          <polygon points="32,126 18,135 22,120 18,110 32,118" fill="#78350F" />
          <polygon points="128,126 142,135 138,120 142,110 128,118" fill="#78350F" />
          <path
            d="M 28 116 C 55 125, 105 125, 132 116 L 128 132 C 103 140, 57 140, 32 132 Z"
            fill="url(#ribbonGold)"
          />
          <text
            x="80"
            y="128.5"
            textAnchor="middle"
            fill="#78350F"
            fontSize="8"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {subtitle}
          </text>
        </g>
      </svg>
    </div>
  );
};
export default LaurelBadge;
