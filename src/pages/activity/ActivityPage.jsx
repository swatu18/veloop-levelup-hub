import React, { useState } from 'react';
import { ArrowLeft, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  TasksClipboard, Gamepad3D, StreakFlame 
} from '../../components/illustrations/GamingIcons';

export const ActivityPage = ({ onBack }) => {
  const { activities, todayXP, todayVEs } = useDashboard();
  const [filter, setFilter] = useState('all'); // 'all' | 'xp' | 've'

  const staticActivities = [
    {
      id: '1',
      title: 'Referral Bonus',
      time: 'Today, 10:45 AM',
      amount: '+20 XP',
      isXP: true,
      color: 'text-emerald-400',
      icon: (
        <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">
          🎯
        </div>
      )
    },
    {
      id: '2',
      title: 'Daily Mission Completed',
      time: 'Today, 09:12 AM',
      amount: '+50 XP',
      isXP: true,
      color: 'text-amber-400',
      icon: <TasksClipboard size={26} />
    },
    {
      id: '3',
      title: 'Mini Game Win',
      time: 'Today, 08:30 AM',
      amount: '+75 XP',
      isXP: true,
      color: 'text-purple-400',
      icon: <Gamepad3D size={26} />
    },
    {
      id: '4',
      title: 'XP Catcher Reward',
      time: 'Today, 07:50 AM',
      amount: '+10 VEs',
      isXP: false,
      color: 'text-amber-400',
      icon: (
        <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs">
          V
        </div>
      )
    },
    {
      id: '5',
      title: 'Streak Bonus',
      time: 'Today, 07:20 AM',
      amount: '+25 XP',
      isXP: true,
      color: 'text-orange-400',
      icon: <StreakFlame size={26} />
    }
  ];

  const filteredItems = staticActivities.filter(act => {
    if (filter === 'xp') return act.isXP;
    if (filter === 've') return !act.isXP;
    return true;
  });

  return (
    <div 
      className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" 
      style={{ backgroundColor: '#0D0E15', minHeight: '100vh' }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-sm font-black tracking-wider text-white font-display uppercase">
          RECENT ACTIVITY
        </h1>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setFilter(f => f === 'all' ? 'xp' : f === 'xp' ? 've' : 'all')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px] font-bold"
          >
            <Filter className="w-4 h-4" />
            <span className="uppercase text-[9px] text-amber-400">{filter}</span>
          </button>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="space-y-2.5 my-3 flex-1">
        {filteredItems.map((act) => (
          <div
            key={act.id}
            className="p-3 rounded-2xl border border-white/5 bg-[#121524] flex items-center justify-between transition-all hover:border-amber-400/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center flex-shrink-0">
                {act.icon}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white font-display tracking-tight leading-none">
                  {act.title}
                </h3>
                <span className="text-[10px] text-slate-400 block mt-1 font-medium">
                  {act.time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-black ${act.color} font-display`}>
                {act.amount}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Today's Summary Card (Page 33 Screen 6) */}
      <div 
        className="p-4 rounded-3xl border border-white/10 bg-[#121524] shadow-xl mt-auto"
      >
        <span className="text-xs font-black uppercase tracking-wider text-slate-300 font-display block mb-3">
          Today's Summary
        </span>

        <div className="grid grid-cols-2 gap-3">
          {/* XP Pill */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-xs shadow-inner">
              XP
            </div>
            <div>
              <span className="text-sm sm:text-base font-black text-white font-display block">
                {todayXP} XP
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                Total Earned
              </span>
            </div>
          </div>

          {/* VEs Pill */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm shadow-inner">
              V
            </div>
            <div>
              <span className="text-sm sm:text-base font-black text-white font-display block">
                {todayVEs} VEs
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                Total Earned
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityPage;
