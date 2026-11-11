import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';
import { PedestalBadge } from '../badges/PedestalBadge';
import { CoinPile, GemCluster } from '../illustrations/CoinPile';
import { useDashboard } from '../../context/DashboardContext';

export const LevelUpModal = ({ isOpen, onClose, level = 5 }) => {
  const { addVEs } = useDashboard();

  useEffect(() => {
    if (isOpen) {
      try {
        const count = 90;
        const defaults = { origin: { y: 0.55 }, colors: ['#F59E0B', '#FEF08A', '#D97706', '#FFFFFF', '#A855F7'] };
        confetti({ ...defaults, particleCount: Math.floor(count * 0.4), spread: 45, startVelocity: 45 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.3), spread: 90, decay: 0.92 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.3), spread: 120, startVelocity: 25 });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    addVEs(500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xs rounded-3xl p-5 border relative text-center overflow-hidden"
        style={{
          backgroundColor: '#0E111E',
          borderColor: 'rgba(245, 158, 11, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.25)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-black text-amber-400 font-display tracking-tight uppercase">
          LEVEL UP!
        </h2>
        <p className="text-xs text-white font-medium mt-0.5">
          You've reached
        </p>

        {/* Grand Golden Pedestal Badge with floating coins */}
        <div className="my-3 flex justify-center relative">
          <PedestalBadge level={level} size={118} />
          {/* Floating small coin & gem beside badge */}
          <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[10px] font-bold text-amber-300">
            V
          </div>
          <div className="absolute top-2 right-4 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-[10px] font-bold text-purple-300">
            💎
          </div>
        </div>

        {/* Dual Reward Cards with 3D Coin Pile and Gem Cluster */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {/* Left Card: +500 VEs */}
          <div 
            className="p-2.5 rounded-2xl border flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <span className="text-sm font-black text-amber-400">+500 VEs</span>
            <div className="my-1">
              <CoinPile size={52} />
            </div>
          </div>

          {/* Right Card: +25 Gems */}
          <div 
            className="p-2.5 rounded-2xl border flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <span className="text-sm font-black text-purple-400">+25 Gems</span>
            <div className="my-1">
              <GemCluster size={52} />
            </div>
          </div>
        </div>

        {/* 3 Perks Checklist from Reference Screen 5 */}
        <div className="text-left space-y-2 mb-4 px-1">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="text-base flex-shrink-0">📈</span>
            <span className="font-medium text-[11px]">Higher daily XP limit</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="text-base flex-shrink-0">🎯</span>
            <span className="font-medium text-[11px]">Access to new challenges</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="text-base flex-shrink-0">🎁</span>
            <span className="font-medium text-[11px]">Better reward opportunities</span>
          </div>
        </div>

        {/* Claim Rewards Gold Pill Button */}
        <button
          onClick={handleClaim}
          className="w-full py-3 px-4 rounded-full font-black text-xs uppercase tracking-wider text-slate-950 transition-all active:scale-[0.98] shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
          }}
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
};
export default LevelUpModal;
