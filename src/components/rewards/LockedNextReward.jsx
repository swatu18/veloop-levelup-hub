import React, { useState } from 'react';
import { Lock, Info, Sparkles, Gift, ChevronRight } from 'lucide-react';
import { TreasureChest } from '../illustrations/TreasureChest';

export const LockedNextReward = ({ 
  currentLevel = 5, 
  currentXP = 6420, 
  nextLevelXP = 8000, 
  onClaim,
  onInfoClick 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const xpNeeded = Math.max(0, nextLevelXP - currentXP);
  const progressPercent = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));
  const isUnlocked = currentXP >= nextLevelXP;

  return (
    <div 
      className="rounded-3xl p-5 border relative overflow-hidden flex flex-col justify-between transition-all"
      style={{
        backgroundColor: '#16192C',
        borderColor: isUnlocked ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)'
      }}
    >
      {/* Background radial shimmer */}
      <div 
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(35px)'
        }}
      />

      {/* Top Tag & Info */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-300 font-display">
            NEXT LEVEL REWARD
          </span>
          <div className="relative">
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-slate-400 hover:text-amber-400 p-0.5 rounded transition-colors"
              title="Reward Information"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            {showTooltip && (
              <div className="absolute left-0 top-6 w-60 p-2.5 rounded-xl bg-[#0E111E] border border-white/10 text-[11px] text-slate-300 z-30 shadow-2xl animate-fadeIn">
                The displayed reward is associated with Level {String(currentLevel + 1).padStart(2, '0')} according to the current reward configuration.
              </div>
            )}
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
          isUnlocked 
            ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300'
            : 'bg-white/5 border border-white/10 text-slate-400'
        }`}>
          {isUnlocked ? (
            <>
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>UNLOCKED</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-slate-400" />
              <span>LOCKED</span>
            </>
          )}
        </span>
      </div>

      {/* Center Visual: 3D Chest & Reward Values */}
      <div className="my-2 flex items-center justify-between gap-4 relative z-10">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display tracking-tight block">
            500 VEs
          </span>
          <span className="text-xs font-bold text-purple-400 block mt-0.5">
            + 20 Rare Gems
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Reach Level {String(currentLevel + 1).padStart(2, '0')} to unlock
          </p>
        </div>

        <div className="flex-shrink-0 transition-transform hover:scale-105 cursor-pointer" onClick={onClaim}>
          <TreasureChest size={76} />
        </div>
      </div>

      {/* Progress towards unlock */}
      <div className="mt-3 relative z-10">
        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 mb-1.5">
          <span>{xpNeeded.toLocaleString()} XP to unlock</span>
          <span className="text-amber-400">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[#090B14] rounded-full p-[1px] border border-white/10 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #A855F7 0%, #F59E0B 100%)',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)'
            }}
          />
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={onClaim}
        className="mt-4 w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:scale-[1.01]"
        style={{
          background: isUnlocked 
            ? 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 100%)' 
            : 'rgba(255, 255, 255, 0.06)',
          color: isUnlocked ? '#0F172A' : '#E2E8F0',
          border: isUnlocked ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <span>{isUnlocked ? 'Claim Unlocked Rewards' : 'Preview Next Rewards Vault'}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default LockedNextReward;
