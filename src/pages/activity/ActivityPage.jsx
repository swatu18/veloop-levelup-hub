import React, { useState } from 'react';
import { ArrowLeft, Filter, ChevronRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  TasksClipboard, Gamepad3D, StreakFlame 
} from '../../components/illustrations/GamingIcons';

export const ActivityPage = ({ onBack }) => {
  const { activities, todayXP, todayVEs } = useDashboard();
  const [filterOpen, setFilterOpen] = useState(false);

  const exactActivities = [
    {
      id: '1',
      title: 'Referral Bonus',
      time: 'Today, 10:45 AM',
      amount: '+20 XP',
      isXP: true,
      color: '#10B981',
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
      color: '#F59E0B',
      icon: <TasksClipboard size={26} />
    },
    {
      id: '3',
      title: 'Mini Game Win',
      time: 'Today, 08:30 AM',
      amount: '+75 XP',
      isXP: true,
      color: '#A855F7',
      icon: <Gamepad3D size={26} />
    },
    {
      id: '4',
      title: 'XP Catcher Reward',
      time: 'Today, 07:50 AM',
      amount: '+10 VEs',
      isXP: false,
      color: '#F59E0B',
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
      color: '#F97316',
      icon: <StreakFlame size={26} />
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
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

        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Activity List */}
      <div className="my-3 space-y-2 flex-1">
        {exactActivities.map((act) => (
          <div
            key={act.id}
            className="p-3 rounded-2xl border flex items-center justify-between transition-all hover:border-white/20"
            style={{
              backgroundColor: '#121524',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0">
                {act.icon}
              </div>

              <div className="min-w-0">
                <span className="text-xs font-black text-white block">
                  {act.amount}
                </span>
                <span className="text-[11px] font-medium text-slate-300 block truncate">
                  {act.title}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {act.time}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Today's Summary Card */}
      <div 
        className="p-4 rounded-2xl border"
        style={{
          backgroundColor: '#121524',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <span className="text-xs font-black text-white font-display block mb-3">
          Today's Summary
        </span>

        <div className="grid grid-cols-2 gap-3">
          {/* Left: XP Earned */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-black text-xs text-purple-300 flex-shrink-0">
              XP
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-none">
                {todayXP} XP
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                Total Earned
              </span>
            </div>
          </div>

          {/* Right: VEs Earned */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-black text-xs text-amber-300 flex-shrink-0">
              V
            </div>
            <div>
              <span className="text-sm font-black text-amber-400 block leading-none">
                {todayVEs} VEs
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
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
