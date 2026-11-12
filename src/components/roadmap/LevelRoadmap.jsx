import React, { useState } from 'react';
import { Check, Lock, Star, ChevronRight, Info, Sparkles, Gift } from 'lucide-react';

export const LevelRoadmap = ({ currentLevel = 5, onSelectLevel }) => {
  const [selectedLvl, setSelectedLvl] = useState(null);

  const levels = [
    { 
      level: 1, 
      name: 'Rookie Explorer', 
      xp: 1000, 
      reward: '25 VEs + Bronze Crest', 
      status: 'completed',
      perks: 'Basic access to daily check-ins and starter missions.'
    },
    { 
      level: 2, 
      name: 'Active Trainee', 
      xp: 2500, 
      reward: '50 VEs + 1x Multiplier', 
      status: 'completed',
      perks: 'Unlocked 1.1x streak multiplier and basic mini games.'
    },
    { 
      level: 3, 
      name: 'Rising Star', 
      xp: 4000, 
      reward: '100 VEs', 
      status: 'completed',
      perks: 'Access to Watch & Earn ad missions and referral tracking.'
    },
    { 
      level: 4, 
      name: 'Elite Quester', 
      xp: 6000, 
      reward: '10 Gems', 
      status: 'completed',
      perks: 'Higher daily task limit and 1.5x mini-game rewards.'
    },
    { 
      level: 5, 
      name: 'Grand Champion', 
      xp: 8000, 
      reward: '500 VEs + 25 Gems', 
      status: 'current',
      perks: 'Unlocked Level 05 Vault, 2.0x multiplier, and VIP challenges.'
    },
    { 
      level: 6, 
      name: 'Master Strategist', 
      xp: 12000, 
      reward: '500 VEs + 2 Spins', 
      status: 'next',
      perks: 'Unlock 2 free daily lucky spins and exclusive monthly tournaments.'
    },
    { 
      level: 7, 
      name: 'Legendary Pioneer', 
      xp: 18000, 
      reward: '1,000 VEs + 50 Gems', 
      status: 'locked',
      perks: 'Highest tier milestone bonus, instant payouts, and custom avatar frames.'
    },
    { 
      level: 8, 
      name: 'Sovereign Titan', 
      xp: 25000, 
      reward: '2,500 VEs + Crown Badge', 
      status: 'locked',
      perks: 'Platform profit sharing and VIP ambassador privileges.'
    }
  ];

  return (
    <div 
      className="rounded-3xl p-5 border relative overflow-hidden text-white"
      style={{
        backgroundColor: '#16192C',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white font-display">
              LEVEL PROGRESSION ROADMAP
            </h3>
            <p className="text-xs text-slate-400">
              Track completed milestones, current progress, and future rewards
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" /> You Are Here
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Next Goal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Locked
          </span>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline on Desktop / Grid on Mobile */}
      <div className="mt-5 relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {levels.map((lvl) => {
            const isCurrent = lvl.level === currentLevel;
            const isCompleted = lvl.level < currentLevel;
            const isNext = lvl.level === currentLevel + 1;
            const isLocked = lvl.level > currentLevel + 1;

            return (
              <div
                key={lvl.level}
                onClick={() => {
                  setSelectedLvl(lvl);
                  if (onSelectLevel) onSelectLevel(lvl.level);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer relative flex flex-col items-center text-center group hover:scale-[1.03] ${
                  isCurrent 
                    ? 'border-amber-400 shadow-lg shadow-amber-500/20 bg-gradient-to-b from-[#222842] to-[#16192C]'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-[#121524] hover:border-emerald-400/60'
                    : isNext
                    ? 'border-blue-500/40 bg-[#141A30] hover:border-blue-400/70'
                    : 'border-white/5 bg-[#0F111E] opacity-70 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {/* Status Badge */}
                <div className="mb-2">
                  {isCompleted && (
                    <span className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-bold shadow-inner">
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    </span>
                  )}
                  {isCurrent && (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-xs font-black shadow-md shadow-amber-500/40 animate-pulse">
                      ★
                    </span>
                  )}
                  {isNext && (
                    <span className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-black">
                      🎯
                    </span>
                  )}
                  {isLocked && (
                    <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-slate-500 flex items-center justify-center text-xs">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <span className="text-xs font-extrabold text-white font-display block leading-tight">
                  Level {String(lvl.level).padStart(2, '0')}
                </span>

                <span className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded-md leading-none ${
                  isCurrent 
                    ? 'bg-amber-400/20 text-amber-300'
                    : isCompleted
                    ? 'text-emerald-400'
                    : isNext
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-slate-500'
                }`}>
                  {isCurrent ? 'YOU ARE HERE' : isCompleted ? 'COMPLETED' : isNext ? 'NEXT GOAL' : 'LOCKED'}
                </span>

                {/* Reward Tag */}
                <div className="mt-3 pt-2 border-t border-white/5 w-full">
                  <span className="text-[10px] text-slate-400 block font-medium">REWARD</span>
                  <span className={`text-[11px] font-bold block truncate mt-0.5 ${
                    isCurrent ? 'text-amber-400' : isCompleted ? 'text-emerald-300' : 'text-slate-300'
                  }`}>
                    {lvl.reward}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Level Details Popover / Banner */}
      {selectedLvl && (
        <div className="mt-4 p-3.5 rounded-2xl bg-[#0F111E] border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white font-display">
                  Level {String(selectedLvl.level).padStart(2, '0')}: {selectedLvl.name}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                  {selectedLvl.xp.toLocaleString()} Total XP
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedLvl.perks}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Unlock Reward</span>
              <span className="text-xs font-black text-amber-400 block">{selectedLvl.reward}</span>
            </div>
            <button
              onClick={() => setSelectedLvl(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LevelRoadmap;
