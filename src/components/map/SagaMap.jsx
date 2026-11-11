import React from 'react';
import { Lock, Star, Sparkles, Check, ChevronLeft } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const SagaMap = ({ onSelectLevel, onBack }) => {
  const { level: currentLevel, triggerLevelUp } = useDashboard();

  // 30 Levels grouped into 6 Realms
  const levels = Array.from({ length: 30 }, (_, i) => {
    const lvlNum = i + 1;
    let realm = 'Neon Valley';
    let realmColor = '#A855F7';
    if (lvlNum > 5 && lvlNum <= 10) {
      realm = 'Gilded Highlands';
      realmColor = '#F59E0B';
    } else if (lvlNum > 10 && lvlNum <= 15) {
      realm = 'Amethyst Caverns';
      realmColor = '#8B5CF6';
    } else if (lvlNum > 15 && lvlNum <= 20) {
      realm = 'Emerald Citadel';
      realmColor = '#10B981';
    } else if (lvlNum > 20 && lvlNum <= 25) {
      realm = 'Ruby Fortress';
      realmColor = '#EF4444';
    } else if (lvlNum > 25) {
      realm = 'Diamond Champion Peak';
      realmColor = '#38BDF8';
    }

    return {
      num: lvlNum,
      isCompleted: lvlNum < currentLevel,
      isCurrent: lvlNum === currentLevel,
      isLocked: lvlNum > currentLevel,
      isMilestone: lvlNum % 5 === 0,
      realm,
      realmColor,
      xpNeeded: lvlNum * 1600
    };
  });

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" style={{ background: '#07080E' }}>
      {/* Map Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-black tracking-wider text-amber-400 uppercase font-display flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SAGA REALM MAP</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Conquer all 30 levels to become the Ultimate Champion
          </p>
        </div>

        <div className="w-8" />
      </div>

      {/* Level Path Road */}
      <div className="my-4 relative flex-1 overflow-y-auto px-4">
        {/* Winding Connecting Line */}
        <div className="relative max-w-[280px] mx-auto py-4 space-y-7">
          {levels.map((lvl, idx) => {
            // Alternating zigzag x-offsets
            const xOffsets = [0, 45, 75, 45, 0, -45, -75, -45];
            const offset = xOffsets[idx % 8];

            return (
              <div 
                key={lvl.num}
                className="relative flex flex-col items-center justify-center transition-transform"
                style={{ transform: `translateX(${offset}px)` }}
              >
                {/* Milestone Realm Banner */}
                {lvl.num % 5 === 1 && (
                  <div 
                    className="mb-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white border shadow-lg"
                    style={{
                      backgroundColor: 'rgba(15, 18, 30, 0.95)',
                      borderColor: lvl.realmColor,
                      boxShadow: `0 0 15px ${lvl.realmColor}33`
                    }}
                  >
                    👑 {lvl.realm} (Lv {lvl.num}-{lvl.num + 4})
                  </div>
                )}

                {/* Level Stepping Stone Button */}
                <button
                  onClick={() => {
                    if (lvl.isCurrent) triggerLevelUp(lvl.num);
                  }}
                  className={`relative flex items-center justify-center rounded-full transition-all active:scale-95 ${
                    lvl.isMilestone ? 'w-14 h-14' : 'w-11 h-11'
                  } ${
                    lvl.isCurrent
                      ? 'ring-4 ring-amber-400 ring-offset-4 ring-offset-[#07080E] animate-bounce'
                      : ''
                  }`}
                  style={{
                    background: lvl.isCurrent
                      ? 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)'
                      : lvl.isCompleted
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #1E2338 0%, #111422 100%)',
                    border: lvl.isCurrent
                      ? '2px solid #FFFFFF'
                      : lvl.isCompleted
                      ? '2px solid #34D399'
                      : '2px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: lvl.isCurrent
                      ? '0 0 25px rgba(245, 158, 11, 0.8)'
                      : lvl.isCompleted
                      ? '0 0 12px rgba(16, 185, 129, 0.4)'
                      : 'none'
                  }}
                >
                  {/* Pawn / Icon Inside */}
                  {lvl.isCurrent ? (
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-[9px] font-black text-slate-950 uppercase tracking-tighter">YOU</span>
                      <span className="text-xs font-black text-slate-950">{lvl.num}</span>
                    </div>
                  ) : lvl.isCompleted ? (
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">{lvl.num}</span>
                    </div>
                  )}

                  {/* Milestone Treasure Crown */}
                  {lvl.isMilestone && (
                    <span className="absolute -top-2 -right-1 text-xs">
                      👑
                    </span>
                  )}
                </button>

                {/* Level Title Tag */}
                <span className={`text-[10px] mt-1 font-extrabold tracking-tight ${
                  lvl.isCurrent ? 'text-amber-400' : lvl.isCompleted ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  Level {String(lvl.num).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SagaMap;
