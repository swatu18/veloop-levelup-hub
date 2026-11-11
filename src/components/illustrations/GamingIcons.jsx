import React from 'react';

// 3D Purple Star Gem for Today's Boost
export const PurpleStarGem = ({ size = 26 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="purpleGemLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
      <linearGradient id="purpleGemDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
    </defs>
    <polygon points="16,2 20.5,11.5 30.5,13 23,20.5 25,30.5 16,25.5 7,30.5 9,20.5 1.5,13 11.5,11.5" fill="url(#purpleGemDark)" stroke="#DDD6FE" strokeWidth="0.8" />
    <polygon points="16,2 16,17 20.5,11.5" fill="url(#purpleGemLight)" />
    <polygon points="30.5,13 16,17 23,20.5" fill="url(#purpleGemLight)" opacity="0.8" />
    <polygon points="25,30.5 16,17 16,25.5" fill="url(#purpleGemLight)" opacity="0.6" />
    <polygon points="7,30.5 16,17 9,20.5" fill="url(#purpleGemLight)" opacity="0.7" />
    <polygon points="1.5,13 16,17 11.5,11.5" fill="url(#purpleGemLight)" opacity="0.9" />
  </svg>
);

// 3D Clipboard for Tasks Done
export const TasksClipboard = ({ size = 26 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <rect x="6" y="5" width="20" height="24" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />
    <rect x="11" y="2" width="10" height="5" rx="2" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="0.8" />
    <line x1="10" y1="12" x2="22" y2="12" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="17" x2="22" y2="17" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="22" x2="18" y2="22" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3D Fire Flame for Streak
export const StreakFlame = ({ size = 26 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="35%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <path
      d="M 16 2 C 17 8, 26 12, 26 21 C 26 27, 21.5 30, 16 30 C 10.5 30, 6 27, 6 21 C 6 14, 11 11, 14 6 C 14 9, 17 11, 18 10 C 18 7, 16 3, 16 2 Z"
      fill="url(#flameGrad)"
      style={{ filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.5))' }}
    />
    <path
      d="M 16 14 C 18 17, 21 19, 21 23 C 21 26, 18.5 28, 16 28 C 13.5 28, 11 26, 11 23 C 11 19, 14 17, 16 14 Z"
      fill="#FEF9C3"
    />
  </svg>
);

// 3D Horseshoe Magnet for XP Catcher
export const HorseshoeMagnet = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="magnetRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="magnetBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="silverTip" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    {/* Horseshoe Arch */}
    <path
      d="M 6 12 C 6 5, 26 5, 26 12 L 26 22 L 20 22 L 20 12 C 20 9, 12 9, 12 12 L 12 22 L 6 22 Z"
      fill="url(#magnetRed)"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
    />
    {/* Silver Tips */}
    <rect x="6" y="21" width="6" height="5" rx="1" fill="url(#silverTip)" />
    <rect x="20" y="21" width="6" height="5" rx="1" fill="url(#silverTip)" />
  </svg>
);

// 3D Game Controller for Mini Games
export const Gamepad3D = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="padGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#7E22CE" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
    </defs>
    <path
      d="M 8 10 C 13 8, 19 8, 24 10 C 28 11, 30 17, 28 23 L 26 26 C 24 28, 22 25, 21 21 L 20 19 L 12 19 L 11 21 C 10 25, 8 28, 6 26 L 4 23 C 2 17, 4 11, 8 10 Z"
      fill="url(#padGrad)"
      stroke="#D8B4FE"
      strokeWidth="0.8"
      style={{ filter: 'drop-shadow(0 3px 8px rgba(126, 34, 206, 0.5))' }}
    />
    {/* D-Pad on Left */}
    <rect x="7.5" y="14" width="3" height="7" rx="1" fill="#FFFFFF" />
    <rect x="5.5" y="16" width="7" height="3" rx="1" fill="#FFFFFF" />
    {/* Action Buttons on Right */}
    <circle cx="21" cy="15.5" r="1.3" fill="#38BDF8" />
    <circle cx="24.5" cy="15.5" r="1.3" fill="#F43F5E" />
    <circle cx="22.7" cy="13.5" r="1.3" fill="#FBBF24" />
    <circle cx="22.7" cy="17.5" r="1.3" fill="#34D399" />
  </svg>
);

// 3D Friends Avatars for Refer & Earn
export const ReferFriends3D = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="avatarGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Left Avatar */}
    <circle cx="11" cy="11" r="5" fill="url(#avatarGold)" />
    <path d="M 4 25 C 4 20, 8 18, 11 18 C 14 18, 18 20, 18 25 Z" fill="url(#avatarGold)" />
    {/* Right Avatar */}
    <circle cx="21" cy="13" r="4.5" fill="url(#avatarGold)" opacity="0.9" />
    <path d="M 15 26 C 15 21, 18 19.5, 21 19.5 C 24 19.5, 28 21, 28 26 Z" fill="url(#avatarGold)" opacity="0.9" />
  </svg>
);

// 3D Play Button for Watch & Earn
export const WatchPlay3D = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="watchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="26" height="24" rx="7" fill="url(#watchGrad)" stroke="#E9D5FF" strokeWidth="0.8" style={{ filter: 'drop-shadow(0 3px 8px rgba(107, 33, 168, 0.5))' }} />
    <polygon points="13,11 22,16 13,21" fill="#FFFFFF" />
  </svg>
);
