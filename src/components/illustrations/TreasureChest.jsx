import React from 'react';

export const TreasureChest = ({ size = 70 }) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 100 90"
        width={size}
        height={size * 0.9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 6px 14px rgba(168, 85, 247, 0.4))' }}
      >
        <defs>
          <linearGradient id="chestWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#854D0E" />
            <stop offset="50%" stopColor="#713F12" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="chestGoldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="crystalPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>

          <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Purple Sparkle Glow Behind Chest */}
        <circle cx="50" cy="40" r="30" fill="rgba(168, 85, 247, 0.3)" filter="url(#purpleGlow)" />

        {/* Chest Base Body */}
        <path
          d="M 18 42 L 82 42 L 78 78 C 78 82, 74 85, 70 85 L 30 85 C 26 85, 22 82, 22 78 Z"
          fill="url(#chestWood)"
        />

        {/* Gold Trim on Base */}
        <path d="M 18 42 L 82 42 L 81 48 L 19 48 Z" fill="url(#chestGoldRim)" />
        <path d="M 22 78 L 78 78 L 76 85 L 24 85 Z" fill="url(#chestGoldRim)" />
        <rect x="19" y="42" width="6" height="40" fill="url(#chestGoldRim)" />
        <rect x="75" y="42" width="6" height="40" fill="url(#chestGoldRim)" />
        <rect x="47" y="42" width="6" height="40" fill="url(#chestGoldRim)" />

        {/* GLOWING PURPLE AMETHYST CRYSTALS SPILLING OUT */}
        <g fill="url(#crystalPurple)">
          {/* Main Top Crystal */}
          <polygon points="50,15 58,32 50,44 42,32" stroke="#F3E8FF" strokeWidth="1" />
          {/* Left Crystal */}
          <polygon points="34,22 44,35 38,45 28,34" stroke="#F3E8FF" strokeWidth="1" />
          {/* Right Crystal */}
          <polygon points="66,22 76,34 68,45 58,35" stroke="#F3E8FF" strokeWidth="1" />
          {/* Small Floating Crystals / Sparkles */}
          <polygon points="20,50 26,58 20,66 14,58" stroke="#F3E8FF" strokeWidth="0.8" />
          <polygon points="80,50 86,58 80,66 74,58" stroke="#F3E8FF" strokeWidth="0.8" />
        </g>

        {/* Chest Open Arched Lid */}
        <path
          d="M 14 38 C 14 18, 86 18, 86 38 L 82 42 C 82 24, 18 24, 18 42 Z"
          fill="url(#chestWood)"
        />
        <path
          d="M 14 38 C 14 18, 86 18, 86 38 L 84 41 C 84 21, 16 21, 16 41 Z"
          fill="url(#chestGoldRim)"
        />

        {/* Center Golden Lock Plate */}
        <rect x="45" y="44" width="10" height="12" rx="2" fill="url(#chestGoldRim)" />
        <circle cx="50" cy="49" r="2" fill="#451A03" />
        <rect x="49" y="49" width="2" height="4" fill="#451A03" />

        {/* Sparkles */}
        <circle cx="48" cy="18" r="1.5" fill="#FFFFFF" />
        <circle cx="68" cy="24" r="1.2" fill="#FFFFFF" />
        <circle cx="32" cy="28" r="1.2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
export default TreasureChest;
