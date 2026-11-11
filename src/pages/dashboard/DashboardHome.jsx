import React, { useState } from 'react';
import { 
  Menu, Bell, Star, CheckSquare, Flame, Play, CheckCircle, 
  Users, Gamepad2, Trophy, Award, Gift, ArrowRight, ChevronRight, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { OctagonBadge } from '../../components/badges/OctagonBadge';

export const DashboardHome = ({ onNavigate }) => {
  const { user, signOut } = useAuth();
  const { 
    level, currentXP, nextLevelXP, veBalance, gemBalance, 
    streakDays, tasksDone, tasksTotal, todayXP, triggerLevelUp 
  } = useDashboard();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const xpPercentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  const earnMoreItems = [
    { id: 'watch', name: 'Watch & Earn', icon: Play, color: '#A855F7', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)', action: () => onNavigate('earn') },
    { id: 'tasks', name: 'Daily Tasks', icon: CheckSquare, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', action: () => onNavigate('earn') },
    { id: 'refer', name: 'Refer & Earn', icon: Users, color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', action: () => onNavigate('earn') },
    { id: 'game', name: 'XP Catcher', icon: Gamepad2, color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.2)', border: 'rgba(251, 191, 36, 0.45)', action: () => onNavigate('game'), highlight: true },
    { id: 'minigames', name: 'Mini Games', icon: Trophy, color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)', action: () => onNavigate('earn') },
    { id: 'streak', name: 'Streak Bonus', icon: Flame, color: '#F97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.3)', action: () => onNavigate('earn') },
  ];

  return (
    <div className="flex-1 flex flex-col pb-24 text-white relative">
      {/* Top Header */}
      <header className="p-4 pt-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5 font-display">
              Good Morning, <span className="text-amber-400">{user?.name ? user.name.split(' ')[0] : 'VeLooper'}</span>!
            </h1>
            <p className="text-[11px] text-slate-400">Level up your journey and unlock epic rewards</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('activity')}
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0D0E15]" />
          </button>
          <div 
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-xl p-[1.5px] cursor-pointer active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #FDE68A, #F59E0B)' }}
          >
            <div className="w-full h-full rounded-[10px] bg-[#151824] flex items-center justify-center font-bold text-xs text-amber-400">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 space-y-5">
        {/* HERO LEVEL CARD */}
        <div 
          className="rounded-3xl p-5 border relative overflow-hidden"
          style={{
            backgroundColor: '#151824',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Ambient Card Glow */}
          <div 
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          />

          <div className="flex items-center gap-4 relative z-10">
            {/* Octagon Badge */}
            <div className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105" onClick={() => triggerLevelUp(level)}>
              <OctagonBadge level={level} size={84} />
            </div>

            {/* Right Column: XP & Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-amber-400 tracking-tight font-display">
                    {currentXP.toLocaleString()} XP
                  </span>
                  <span className="block text-[11px] text-slate-400 font-medium">
                    to reach Level {String(level + 1).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {xpPercentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full h-3 bg-[#0D0F18] rounded-full p-[2px] border border-white/5 relative overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 relative"
                    style={{
                      width: `${xpPercentage}%`,
                      background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #FDE68A 100%)',
                      boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-400 font-medium">
                  <span>{currentXP.toLocaleString()} XP</span>
                  <span>{nextLevelXP.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY'S BOOST (3 Stat Cards) */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              TODAY'S BOOST
            </h2>
            <span className="text-[10px] text-slate-400">Resets in 14h</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: XP */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#151824',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-sm font-black text-white">{todayXP} XP</span>
              <span className="text-[10px] text-slate-400 font-medium">Earned</span>
            </div>

            {/* Card 2: Tasks */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#151824',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-1">
                <CheckSquare className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm font-black text-white">{tasksDone}/{tasksTotal}</span>
              <span className="text-[10px] text-slate-400 font-medium">Tasks</span>
            </div>

            {/* Card 3: Streak */}
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:border-amber-400/40"
              style={{
                backgroundColor: '#151824',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-1">
                <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
              </div>
              <span className="text-sm font-black text-white">{streakDays} Days</span>
              <span className="text-[10px] text-slate-400 font-medium">Streak</span>
            </div>
          </div>
        </div>

        {/* EARN MORE (6 Circular Icon Buttons) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              EARN MORE
            </h2>
            <button onClick={() => onNavigate('earn')} className="text-[10px] text-amber-400 font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {earnMoreItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 group text-center relative overflow-hidden"
                  style={{
                    backgroundColor: item.highlight ? '#191E30' : '#151824',
                    borderColor: item.border
                  }}
                >
                  {item.highlight && (
                    <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-[8px] font-black text-slate-950 uppercase tracking-tighter">
                      HOT
                    </span>
                  )}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shadow-md"
                    style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-bold text-slate-200 tracking-tight leading-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL 05 REWARDS VAULT */}
        <div 
          onClick={() => triggerLevelUp(level)}
          className="rounded-3xl p-4 border relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] group"
          style={{
            background: 'linear-gradient(135deg, #1C1F32 0%, #151824 100%)',
            borderColor: 'rgba(245, 158, 11, 0.35)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center gap-3.5 relative z-10">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)'
              }}
            >
              👑
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Level 05 Rewards Vault
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold">
                  UNLOCKED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 truncate">
                Amazing rewards await you! Click to claim
              </p>
            </div>

            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Settings/Profile Drawer */}
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
              <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                <OctagonBadge level={level} size={50} />
                <div>
                  <h3 className="font-bold text-white text-sm">{user?.name || 'VeLooper'}</h3>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('home'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Dashboard Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('earn'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Earn & Level Up Hub</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('game'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>XP Catcher Game</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('activity'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Recent Activity Ledger</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); triggerLevelUp(level); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-semibold text-amber-400 flex items-center justify-between"
                >
                  <span>Show Level Up Celebration</span>
                  <ChevronRight className="w-4 h-4 text-amber-400/50" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  signOut();
                  setDrawerOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardHome;
