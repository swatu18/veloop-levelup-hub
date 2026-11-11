import React from 'react';

export const CoinPile = ({ size = 64 }) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size * 0.75 }}>
      <svg
        viewBox="0 0 80 60"
        width={size}
        height={size * 0.75}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(245, 158, 11, 0.4))' }}
      >
        <defs>
          <linearGradient id="coinFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="coinEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* Bottom Layer Coins */}
        {/* Left Coin */}
        <ellipse cx="25" cy="46" rx="18" ry="7" fill="url(#coinEdge)" />
        <ellipse cx="25" cy="43" rx="18" ry="6.5" fill="url(#coinFace)" stroke="#FEF08A" strokeWidth="0.8" />
        <text x="25" y="45.5" textAnchor="middle" fill="#78350F" fontSize="6.5" fontWeight="900">V</text>

        {/* Right Coin */}
        <ellipse cx="55" cy="46" rx="18" ry="7" fill="url(#coinEdge)" />
        <ellipse cx="55" cy="43" rx="18" ry="6.5" fill="url(#coinFace)" stroke="#FEF08A" strokeWidth="0.8" />
        <text x="55" y="45.5" textAnchor="middle" fill="#78350F" fontSize="6.5" fontWeight="900">V</text>

        {/* Middle Overlapping Coin */}
        <ellipse cx="40" cy="36" rx="18" ry="7" fill="url(#coinEdge)" />
        <ellipse cx="40" cy="33" rx="18" ry="6.5" fill="url(#coinFace)" stroke="#FEF08A" strokeWidth="0.8" />
        <text x="40" y="35.5" textAnchor="middle" fill="#78350F" fontSize="6.5" fontWeight="900">V</text>

        {/* Top Floating Coin tilted */}
        <g transform="rotate(-15 32 20)">
          <ellipse cx="32" cy="20" rx="16" ry="6.5" fill="url(#coinEdge)" />
          <ellipse cx="32" cy="18" rx="16" ry="6" fill="url(#coinFace)" stroke="#FEF08A" strokeWidth="0.8" />
          <text x="32" y="20.5" textAnchor="middle" fill="#78350F" fontSize="6" fontWeight="900">V</text>
        </g>
      </svg>
    </div>
  );
};

export const GemCluster = ({ size = 64 }) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size * 0.75 }}>
      <svg
        viewBox="0 0 80 60"
        width={size}
        height={size * 0.75}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(168, 85, 247, 0.45))' }}
      >
        <defs>
          <linearGradient id="gemGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="40%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>

          <linearGradient id="gemGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
        </defs>

        {/* Left Crystal */}
        <polygon points="22,25 32,38 24,52 14,39" fill="url(#gemGradDark)" stroke="#E9D5FF" strokeWidth="0.8" />
        <polygon points="22,25 32,38 24,52" fill="url(#gemGradLight)" opacity="0.6" />

        {/* Right Crystal */}
        <polygon points="58,25 68,39 58,52 48,38" fill="url(#gemGradDark)" stroke="#E9D5FF" strokeWidth="0.8" />
        <polygon points="58,25 68,39 58,52" fill="url(#gemGradLight)" opacity="0.6" />

        {/* Center Main Crystal */}
        <polygon points="40,10 52,30 40,54 28,30" fill="url(#gemGradDark)" stroke="#F3E8FF" strokeWidth="1" />
        <polygon points="40,10 52,30 40,54" fill="url(#gemGradLight)" opacity="0.75" />

        {/* Sparkle glints */}
        <circle cx="40" cy="14" r="1.5" fill="#FFFFFF" />
        <circle cx="50" cy="28" r="1" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
