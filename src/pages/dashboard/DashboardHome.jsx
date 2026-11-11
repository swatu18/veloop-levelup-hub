import React, { useState } from 'react';
import { Menu, Bell, ArrowRight, ChevronRight, LogOut, X, Map, Sparkles, Volume2, VolumeX, Play, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { PedestalBadge } from '../../components/badges/PedestalBadge';
import { TreasureChest } from '../../components/illustrations/TreasureChest';
import { 
  PurpleStarGem, TasksClipboard, StreakFlame, 
  HorseshoeMagnet, Gamepad3D, ReferFriends3D, WatchPlay3D 
} from '../../components/illustrations/GamingIcons';
import { sounds } from '../../utils/sound';

export const DashboardHome = ({ onNavigate }) => {
  const { user, signOut } = useAuth();
  const { 
    level, currentXP, nextLevelXP, 
    streakDays, tasksDone, tasksTotal, todayXP, todayVEs, triggerLevelUp 
  } = useDashboard();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const xpPercentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  const toggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setIsMuted(!sounds.enabled);
    if (sounds.enabled) sounds.playCoin();
  };

  const earnMoreItems = [
    { id: 'watch', name: 'Watch & Earn', icon: WatchPlay3D, desc: '+50 XP', action: () => onNavigate('earn') },
    { id: 'tasks', name: 'Daily Tasks', icon: TasksClipboard, desc: '+30 XP', action: () => onNavigate('earn') },
    { id: 'refer', name: 'Refer & Earn', icon: ReferFriends3D, desc: '+100 XP', action: () => onNavigate('earn') },
    { id: 'game', name: 'XP Catcher', icon: HorseshoeMagnet, desc: 'Play Arcade', action: () => onNavigate('game'), highlight: true },
    { id: 'minigames', name: 'Mini Games', icon: Gamepad3D, desc: '+75 XP', action: () => onNavigate('earn') },
    { id: 'streak', name: 'Streak Bonus', icon: StreakFlame, desc: '+25 XP', action: () => onNavigate('earn') },
  ];

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-8 text-white relative w-full">
      {/* Mobile Top Header (hidden on desktop because DesktopNavbar is visible) */}
      <header className="flex md:hidden px-4 pt-4 pb-3 items-center justify-between border-b border-white/5">
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

        <div className="flex items-center gap-1">
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <button 
            onClick={() => onNavigate('activity')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors relative"
          >
            <Bell className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0D0E15]" />
          </button>
        </div>
      </header>

      {/* Main Responsive Grid Layout (scales for Phone, Tablet, Laptop, Desktop, Mac OS) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Main Content Area (Full on mobile, 8-columns on desktop) */}
          <div className="lg:col-span-8 space-y-5">
            {/* HERO LEVEL CARD */}
            <div 
              className="rounded-3xl p-5 sm:p-6 border relative overflow-hidden transition-all"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(245, 158, 11, 0.35)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Warm glow */}
              <div 
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />

              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-7 relative z-10">
                {/* Left: Pedestal Badge (Level 05 on 3D gold dais) */}
                <div 
                  className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  onClick={() => triggerLevelUp(level)}
                >
                  <PedestalBadge level={level} size={105} />
                </div>

                {/* Right: XP Values and Progress */}
                <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-display block leading-none">
                        {currentXP.toLocaleString()} XP
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 font-medium block mt-1.5">
                        to reach Level {String(level + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="inline-block self-center sm:self-auto px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
                      {xpPercentage}% Completed
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full h-3.5 bg-[#090B14] rounded-full p-[2px] border border-white/10 relative overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700 relative"
                        style={{
                          width: `${xpPercentage}%`,
                          background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #FEF08A 100%)',
                          boxShadow: '0 0 16px rgba(245, 158, 11, 0.8)'
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400 font-bold mt-2 tracking-wide">
                      <span>{currentXP.toLocaleString()} XP</span>
                      <span>{nextLevelXP.toLocaleString()} XP Goal</span>
                    </div>
                  </div>

                  {/* Candy Crush Saga Map launcher */}
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => onNavigate('map')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider"
                    >
                      <Map className="w-4 h-4 text-amber-400" />
                      <span>Explore 30-Level Saga Realm Map</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigate('game')}
                      className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Play Catcher</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ⚡ TODAY'S BOOST (3 Cards - Responsive Grid) */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 px-1">
                <span className="text-amber-400 text-sm">⚡</span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 font-display">
                  TODAY'S BOOST
                </h2>
                <span className="text-xs text-slate-500 ml-auto">Daily Reset in 12h</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Card 1: XP Earned */}
                <div 
                  className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#121524',
                    borderColor: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="p-2 rounded-2xl bg-purple-500/10">
                    <PurpleStarGem size={30} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">XP Earned Today</span>
                    <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{todayXP} XP</span>
                  </div>
                </div>

                {/* Card 2: Tasks Done */}
                <div 
                  className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#121524',
                    borderColor: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="p-2 rounded-2xl bg-blue-500/10">
                    <TasksClipboard size={30} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Daily Tasks Done</span>
                    <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{tasksDone} / {tasksTotal}</span>
                  </div>
                </div>

                {/* Card 3: Streak */}
                <div 
                  className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#121524',
                    borderColor: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="p-2 rounded-2xl bg-orange-500/10">
                    <StreakFlame size={30} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Active Player Streak</span>
                    <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{streakDays} Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EARN MORE (Responsive 6 Icons) */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 font-display">
                    EARN MORE
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Explore fun activities and earn exciting rewards.
                  </p>
                </div>

                <button 
                  onClick={() => onNavigate('earn')}
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>View All Quests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {earnMoreItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all active:scale-95 hover:-translate-y-1 group text-center relative overflow-hidden"
                      style={{
                        backgroundColor: item.highlight ? '#171B2D' : '#121524',
                        borderColor: item.highlight ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {item.highlight && (
                        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-[8px] font-black text-slate-950 uppercase tracking-tighter">
                          HOT
                        </span>
                      )}
                      <div className="w-12 h-12 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <IconComponent size={32} />
                      </div>
                      <span className="text-xs font-bold text-slate-200 tracking-tight leading-tight block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold mt-0.5 block">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LEVEL 05 REWARDS (Treasure Chest Overflowing with Purple Gems) */}
            <div 
              onClick={() => triggerLevelUp(level)}
              className="rounded-3xl p-5 border relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] hover:border-amber-400/50 group"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="flex items-center justify-between relative z-10 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white font-display">
                      Level 05 Rewards Vault
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                      UNLOCKED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Amazing rewards await you! Click to claim coins & rare crystals.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline pt-1">
                    <span>View & Claim Rewards</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                  <TreasureChest size={84} />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Sidebar Column (4-columns on lg screens) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Quick Play XP Catcher Arena Card */}
            <div 
              className="rounded-3xl p-5 border relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #161A2C 0%, #0E111E 100%)',
                borderColor: 'rgba(245, 158, 11, 0.35)',
                boxShadow: '0 14px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-display">
                    ARCADE ARENA
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-white/5 px-2 py-0.5 rounded-md">
                  LIVE
                </span>
              </div>

              <h4 className="text-base font-black text-white font-display">
                XP Catcher Challenge
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Catch falling purple XP orbs, coins, and green gems in 18 seconds!
              </p>

              <div className="my-4 p-3 rounded-2xl bg-[#090B14] border border-white/5 flex items-center justify-around text-center">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">BEST SCORE</span>
                  <span className="text-xl font-black text-amber-400 font-display">92 PTS</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">MULTIPLIER</span>
                  <span className="text-xl font-black text-purple-400 font-display">2.0X</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('game')}
                className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-95 hover:scale-[1.02] shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)',
                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
                }}
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Launch Arcade Game</span>
              </button>
            </div>

            {/* Quick Recent Activity Card */}
            <div 
              className="rounded-3xl p-5 border relative overflow-hidden"
              style={{
                backgroundColor: '#121524',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 font-display">
                  RECENT ACTIVITY
                </span>
                <button
                  onClick={() => onNavigate('activity')}
                  className="text-[11px] font-bold text-amber-400 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🎯</span>
                    <div>
                      <span className="text-xs font-bold text-white block">Referral Bonus</span>
                      <span className="text-[10px] text-slate-500">Today, 10:45 AM</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400">+20 XP</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📋</span>
                    <div>
                      <span className="text-xs font-bold text-white block">Daily Mission Completed</span>
                      <span className="text-[10px] text-slate-500">Today, 09:12 AM</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400">+50 XP</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🪙</span>
                    <div>
                      <span className="text-xs font-bold text-white block">XP Catcher Reward</span>
                      <span className="text-[10px] text-slate-500">Today, 07:50 AM</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400">+10 VEs</span>
                </div>
              </div>

              {/* Today's summary mini pill */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Earned Today:</span>
                <span className="text-amber-400">{todayXP} XP & {todayVEs} VEs</span>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                  <span>Dashboard Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('map'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-amber-400 flex items-center justify-between"
                >
                  <span>Saga Realm Map (30 Levels)</span>
                  <ChevronRight className="w-4 h-4 text-amber-400/50" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('game'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>XP Catcher Arcade Game</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('earn'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Earn & Level Up Hub</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); triggerLevelUp(level); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-amber-400 flex items-center justify-between"
                >
                  <span>Level Up Celebration Modal</span>
                  <ChevronRight className="w-4 h-4 text-amber-400/50" />
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); onNavigate('activity'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 flex items-center justify-between"
                >
                  <span>Recent Activity Ledger</span>
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
