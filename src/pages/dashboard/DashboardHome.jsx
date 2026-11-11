import React, { useState } from 'react';
import { Menu, Bell, ArrowRight, ChevronRight, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { PedestalBadge } from '../../components/badges/PedestalBadge';
import { TreasureChest } from '../../components/illustrations/TreasureChest';
import { 
  PurpleStarGem, TasksClipboard, StreakFlame, 
  HorseshoeMagnet, Gamepad3D, ReferFriends3D, WatchPlay3D 
} from '../../components/illustrations/GamingIcons';

export const DashboardHome = ({ onNavigate }) => {
  const { user, signOut } = useAuth();
  const { 
    level, currentXP, nextLevelXP, 
    streakDays, tasksDone, tasksTotal, todayXP, triggerLevelUp 
  } = useDashboard();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const xpPercentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  const earnMoreItems = [
    { id: 'watch', name: 'Watch & Earn', icon: WatchPlay3D, action: () => onNavigate('earn') },
    { id: 'tasks', name: 'Daily Tasks', icon: TasksClipboard, action: () => onNavigate('earn') },
    { id: 'refer', name: 'Refer & Earn', icon: ReferFriends3D, action: () => onNavigate('earn') },
    { id: 'game', name: 'XP Catcher', icon: HorseshoeMagnet, action: () => onNavigate('game'), highlight: true },
    { id: 'minigames', name: 'Mini Games', icon: Gamepad3D, action: () => onNavigate('earn') },
    { id: 'streak', name: 'Streak Bonus', icon: StreakFlame, action: () => onNavigate('earn') },
  ];

  return (
    <div className="flex-1 flex flex-col pb-24 text-white relative">
      {/* Top Header */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/5">
        <button 
          onClick={() => setDrawerOpen(true)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-extrabold text-white flex items-center justify-center gap-1 font-display tracking-tight">
            Good Morning, <span className="text-amber-400">VeLooper!</span> 👋
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>

        <button 
          onClick={() => onNavigate('activity')}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors relative"
        >
          <Bell className="w-5 h-5 stroke-[2.2]" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0D0E15]" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="px-4 py-3 space-y-4">
        {/* HERO LEVEL CARD */}
        <div 
          className="rounded-3xl p-4 border relative overflow-hidden"
          style={{
            backgroundColor: '#121524',
            borderColor: 'rgba(245, 158, 11, 0.35)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Ambient card warm glow */}
          <div 
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          />

          <div className="flex items-center gap-4 relative z-10">
            {/* Left: Pedestal Badge (Level 05 on 3D gold dais) */}
            <div 
              className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              onClick={() => triggerLevelUp(level)}
            >
              <PedestalBadge level={level} size={88} />
            </div>

            {/* Right: XP Values and Progress */}
            <div className="flex-1 min-w-0">
              <span className="text-2xl font-black text-amber-400 tracking-tight font-display block leading-none">
                {currentXP.toLocaleString()} XP
              </span>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">
                to reach Level {String(level + 1).padStart(2, '0')}
              </span>

              {/* Progress Bar with 6,420 / 8,000 XP */}
              <div className="mt-3">
                <div className="w-full h-3 bg-[#0A0C14] rounded-full p-[2px] border border-white/10 relative overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 relative"
                    style={{
                      width: `${xpPercentage}%`,
                      background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #FEF08A 100%)',
                      boxShadow: '0 0 14px rgba(245, 158, 11, 0.7)'
                    }}
                  />
                </div>
                <div className="text-center text-[10px] text-slate-400 font-bold mt-1.5 tracking-wide">
                  {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⚡ TODAY'S BOOST (3 Cards) */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <span className="text-amber-400 text-xs">⚡</span>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-200 font-display">
              TODAY'S BOOST
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: XP Earned */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="mb-1.5">
                <PurpleStarGem size={26} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">XP Earned</span>
              <span className="text-xs font-black text-white mt-0.5">{todayXP} XP</span>
            </div>

            {/* Card 2: Tasks Done */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="mb-1.5">
                <TasksClipboard size={26} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Tasks Done</span>
              <span className="text-xs font-black text-white mt-0.5">{tasksDone} / {tasksTotal}</span>
            </div>

            {/* Card 3: Streak */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="mb-1.5">
                <StreakFlame size={26} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Streak</span>
              <span className="text-xs font-black text-white mt-0.5">{streakDays} Days</span>
            </div>
          </div>
        </div>

        {/* EARN MORE (Subtitle + right arrow circle + 6 icons) */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-200 font-display">
                EARN MORE
              </h2>
              <p className="text-[10px] text-slate-400">
                Explore fun activities and earn exciting rewards.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('earn')}
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {earnMoreItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 group text-center relative overflow-hidden"
                  style={{
                    backgroundColor: item.highlight ? '#161A2B' : '#121524',
                    borderColor: item.highlight ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-1 transition-transform group-hover:scale-110">
                    <IconComponent size={28} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL 05 REWARDS (Treasure Chest Overflowing with Purple Gems) */}
        <div 
          onClick={() => triggerLevelUp(level)}
          className="rounded-3xl p-4 border relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] group"
          style={{
            backgroundColor: '#121524',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white font-display">
                Level 05 Rewards
              </h3>
              <p className="text-[11px] text-slate-400">
                Amazing rewards await you!
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:underline pt-0.5">
                <span>View Rewards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 3D Treasure Chest Overflowing with Purple Gems */}
            <div className="flex-shrink-0 transition-transform group-hover:scale-105">
              <TreasureChest size={76} />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div 
            className="relative w-72 max-w-[80%] h-full bg-[#121524] border-r border-white/10 p-5 flex flex-col justify-between z-10 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <PedestalBadge level={level} size={50} showPedestal={false} />
                  <div>
                    <h3 className="font-bold text-white text-sm">{user?.name || 'VeLooper'}</h3>
                    <p className="text-xs text-slate-400">{user?.email || 'player@veloop.io'}</p>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-1.5">
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('home'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Screen 1: Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('game'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Screen 2: XP Catcher Game</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('earn'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Screen 4: Earn & Level Up Hub</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); triggerLevelUp(level); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-amber-400 flex items-center justify-between"
                >
                  <span>Screen 5: Level Up Celebration</span>
                  <ChevronRight className="w-4 h-4 text-amber-400/50" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('activity'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Screen 6: Recent Activity</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  signOut();
                  setDrawerOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Switch / Sign In with Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardHome;
