import React, { useState } from 'react';
import { ArrowLeft, Filter, Users, CheckCircle, Gamepad2, Coins, Flame, Zap, Award } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const ActivityPage = ({ onBack }) => {
  const { activities, todayXP, todayVEs } = useDashboard();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'xp' | 've'

  const filteredActivities = activities.filter(act => {
    if (filterType === 'xp') return act.isXP;
    if (filterType === 've') return !act.isXP;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'referral':
        return <Users className="w-4 h-4 text-emerald-400" />;
      case 'mission':
        return <CheckCircle className="w-4 h-4 text-amber-400" />;
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-blue-400" />;
      case 'streak':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 've':
        return <Coins className="w-4 h-4 text-amber-400" />;
      default:
        return <Zap className="w-4 h-4 text-purple-400" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'referral':
        return 'rgba(16, 185, 129, 0.15)';
      case 'mission':
        return 'rgba(245, 158, 11, 0.15)';
      case 'game':
        return 'rgba(56, 189, 248, 0.15)';
      case 'streak':
        return 'rgba(249, 115, 22, 0.15)';
      case 've':
        return 'rgba(245, 158, 11, 0.15)';
      default:
        return 'rgba(168, 85, 247, 0.15)';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white font-display">
              RECENT ACTIVITY
            </h1>
            <p className="text-[11px] text-slate-400">History of your experience & rewards</p>
          </div>
        </div>

        {/* Filter toggle */}
        <div className="flex items-center gap-1 bg-[#151824] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterType === 'all' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('xp')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterType === 'xp' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
            }`}
          >
            XP
          </button>
          <button
            onClick={() => setFilterType('ve')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterType === 've' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
            }`}
          >
            VEs
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="my-4 space-y-2.5 flex-1 overflow-y-auto">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:border-white/20"
            style={{
              backgroundColor: '#151824',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: getIconBg(act.type) }}
              >
                {getIcon(act.type)}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">
                  {act.title}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {act.time}
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span 
                className={`text-sm font-extrabold ${
                  act.isXP ? 'text-amber-400' : 'text-amber-300'
                }`}
              >
                {act.amount}
              </span>
              <span className="block text-[9px] text-slate-500 font-semibold uppercase">
                Credited
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Summary Card */}
      <div 
        className="p-4 rounded-2xl border"
        style={{
          backgroundColor: '#151824',
          borderColor: 'rgba(245, 158, 11, 0.25)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          TODAY'S SUMMARY
        </span>
        <div className="grid grid-cols-2 divide-x divide-white/10 text-center">
          <div className="pr-2">
            <span className="text-xl font-black text-amber-400 font-display">
              {todayXP} XP
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
              Total XP Earned
            </span>
          </div>

          <div className="pl-2">
            <span className="text-xl font-black text-amber-400 font-display">
              {todayVEs} VEs
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
              Total VEs Earned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityPage;
