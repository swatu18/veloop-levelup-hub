import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Sparkles, TrendingUp, Target, Gift } from 'lucide-react';
import { PedestalBadge } from '../badges/PedestalBadge';
import { CoinPile } from '../illustrations/CoinPile';
import { useDashboard } from '../../context/DashboardContext';
import { sounds } from '../../utils/sound';

export const LevelUpModal = ({ isOpen, onClose, level = 5 }) => {
  const { addVEs } = useDashboard();

  useEffect(() => {
    if (isOpen) {
      sounds.playLevelUp();
      try {
        const count = 120;
        const defaults = { origin: { y: 0.55 }, colors: ['#F59E0B', '#FEF08A', '#D97706', '#FFFFFF', '#A855F7'] };
        confetti({ ...defaults, particleCount: Math.floor(count * 0.4), spread: 50, startVelocity: 45 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.3), spread: 95, decay: 0.92 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.3), spread: 130, startVelocity: 28 });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    sounds.playCoin();
    addVEs(500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-sm rounded-[36px] p-6 border relative text-center overflow-hidden"
        style={{
          backgroundColor: '#0E111E',
          borderColor: 'rgba(245, 158, 11, 0.45)',
          boxShadow: '0 25px 65px rgba(0, 0, 0, 0.95), 0 0 45px rgba(245, 158, 11, 0.3)'
        }}
      >
        {/* Ambient Top Glow */}
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, transparent 70%)',
            filter: 'blur(45px)'
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header (Page 33 Screen 5) */}
        <div className="relative z-10 pt-1">
          <h2 className="text-2xl sm:text-3xl font-black text-amber-400 font-display tracking-tight uppercase">
            LEVEL UP!
          </h2>
          <p className="text-xs text-white font-semibold mt-0.5 tracking-wide">
            You've reached
          </p>
        </div>

        {/* Grand 3D Golden Pedestal Badge with floating coins and gems */}
        <div className="my-3 flex justify-center relative z-10">
          <PedestalBadge level={level} size={135} />

          {/* Floating Coin on Left */}
          <div 
            className="absolute top-6 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 border border-yellow-200 flex items-center justify-center text-xs font-black text-amber-950 shadow-lg shadow-amber-500/50 animate-bounce"
            style={{ animationDuration: '2.5s' }}
          >
            V
          </div>

          {/* Floating Purple Gem on Right */}
          <div 
            className="absolute top-4 right-4 w-7 h-7 rotate-12 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50 animate-bounce"
            style={{ animationDuration: '3s', animationDelay: '0.4s' }}
          >
            💎
          </div>
        </div>

        {/* Dual Reward Cards with 3D Coin Pile and Gem Cluster */}
        <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
          {/* Left Card: +500 VEs */}
          <div 
            className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <span className="text-sm font-black text-amber-400 block">+500 VEs</span>
            <div className="my-1.5 flex justify-center">
              <CoinPile size={52} />
            </div>
          </div>

          {/* Right Card: +25 Gems */}
          <div 
            className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <span className="text-sm font-black text-purple-400 block">+25 Gems</span>
            <div className="my-1.5 flex justify-center text-3xl filter drop-shadow">
              💎
            </div>
          </div>
        </div>

        {/* Perks Unlocked List (Page 33 Screen 5) */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2 mb-4 relative z-10">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
            <span className="text-amber-400 text-sm">📈</span>
            <span>Higher daily XP limit</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
            <span className="text-amber-400 text-sm">🎯</span>
            <span>Access to new challenges</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
            <span className="text-amber-400 text-sm">🎁</span>
            <span>Better reward opportunities</span>
          </div>
        </div>

        {/* Claim Rewards Golden Button */}
        <button
          onClick={handleClaim}
          className="w-full py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-95 hover:scale-[1.02] shadow-xl shadow-amber-500/40 relative z-10"
          style={{
            background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)'
          }}
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>Claim Rewards</span>
        </button>
      </div>
    </div>
  );
};
export default LevelUpModal;
