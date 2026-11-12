import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const EmptyActivityState = ({ onStartEarning }) => {
  return (
    <div className="p-8 rounded-3xl bg-[#16192C] border border-white/5 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mx-auto flex items-center justify-center">
        <Sparkles className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-black text-white font-display">
        No XP Activity Yet
      </h4>
      <p className="text-xs text-slate-400">
        Your XP journey starts here! Play the mini-game or complete daily quests to earn rewards.
      </p>
      <button
        onClick={onStartEarning}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-xs hover:bg-amber-400/25 transition-all mt-2"
      >
        <span>Start Earning XP</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
export default EmptyActivityState;
