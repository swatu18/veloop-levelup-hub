import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, X } from 'lucide-react';
import { LaurelBadge } from '../badges/LaurelBadge';
import { useDashboard } from '../../context/DashboardContext';

export const LevelUpModal = ({ isOpen, onClose, level = 5 }) => {
  const { addVEs } = useDashboard();

  useEffect(() => {
    if (isOpen) {
      // Elegant gold and amber confetti burst
      try {
        const count = 120;
        const defaults = {
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FDE68A', '#D97706', '#FEF08A', '#ffffff']
        };

        const fire = (particleRatio, opts) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (e) {
        console.error('Confetti error:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    addVEs(500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-sm rounded-3xl p-6 border relative text-center overflow-hidden"
        style={{
          backgroundColor: '#121524',
          borderColor: 'rgba(245, 158, 11, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.2)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top spark */}
        <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone Achieved</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-2xl font-black text-white font-display tracking-tight">
          LEVEL UP!
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          You've reached an epic new tier!
        </p>

        {/* Laurel Badge in center */}
        <div className="my-4 flex justify-center">
          <LaurelBadge level={level} size={135} subtitle="CHAMPION" />
        </div>

        {/* Rewards Section */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Card 1: VEs */}
          <div 
            className="p-3 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: '#181C2E',
              borderColor: 'rgba(245, 158, 11, 0.25)'
            }}
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-1.5 text-lg font-black text-amber-400">
              🪙
            </div>
            <span className="text-lg font-extrabold text-amber-400">+500 VEs</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Coins Unlocked</span>
          </div>

          {/* Card 2: Gems */}
          <div 
            className="p-3 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: '#181C2E',
              borderColor: 'rgba(168, 85, 247, 0.25)'
            }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-1.5 text-lg font-black text-purple-400">
              💎
            </div>
            <span className="text-lg font-extrabold text-purple-400">+25 Gems</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rare Crystals</span>
          </div>
        </div>

        {/* Perks list */}
        <div className="text-left bg-[#0D0F18] p-3.5 rounded-2xl border border-white/5 space-y-2 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
            Unlocked Perks:
          </p>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>+15% Multiplier on all Daily Challenges</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Unlocked Exclusive Level 05 Rewards Vault</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Priority Access to VIP Tournaments & Events</span>
          </div>
        </div>

        {/* Claim Rewards Button */}
        <button
          onClick={handleClaim}
          className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-slate-950 transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
          }}
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Claim Rewards</span>
        </button>
      </div>
    </div>
  );
};
export default LevelUpModal;
