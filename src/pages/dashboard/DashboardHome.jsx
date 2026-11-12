import React, { useState } from 'react';
import { 
  Menu, Bell, ArrowRight, ChevronRight, LogOut, X, Map, 
  Sparkles, Volume2, VolumeX, Play, Trophy, Info, Lock, 
  HelpCircle, Check 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { OctagonBadge } from '../../components/badges/OctagonBadge';
import { TreasureChest } from '../../components/illustrations/TreasureChest';
import { 
  PurpleStarGem, TasksClipboard, StreakFlame, 
  HorseshoeMagnet, Gamepad3D, ReferFriends3D, WatchPlay3D 
} from '../../components/illustrations/GamingIcons';
import { LevelRoadmap } from '../../components/roadmap/LevelRoadmap';
import { LockedNextReward } from '../../components/rewards/LockedNextReward';
import { LoadingSkeleton } from '../../components/states/LoadingSkeleton';
import { ErrorState } from '../../components/states/ErrorState';
import { EmptyActivityState } from '../../components/states/EmptyActivityState';
import { sounds } from '../../utils/sound';

export const DashboardHome = ({ onNavigate }) => {
  const { user, signOut } = useAuth();
  const { 
    level, currentXP, nextLevelXP, 
    streakDays, tasksDone, tasksTotal, todayXP, todayVEs, triggerLevelUp, activities 
  } = useDashboard();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const [viewState, setViewState] = useState('normal'); // 'normal' | 'loading' | 'error' | 'empty'

  const xpNeeded = Math.max(0, nextLevelXP - currentXP);
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

  if (viewState === 'loading') {
    return (
      <div className="flex-1 flex flex-col text-white pb-16">
        <div className="flex justify-center p-3 bg-white/5 border-b border-white/10">
          <button 
            onClick={() => setViewState('normal')}
            className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
          >
            ← Exit Loading Simulation
          </button>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (viewState === 'error') {
    return (
      <div className="flex-1 flex flex-col text-white pb-16 justify-center">
        <ErrorState onRetry={() => setViewState('normal')} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-24 md:pb-12 text-white relative w-full" style={{ backgroundColor: '#161827' }}>
      
      {/* Dev / Reviewer Quick State Switcher Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 bg-[#121422] border-b border-white/5 text-[11px] font-semibold text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold">VeLoop Live Engine</span>
          <span className="text-slate-600">|</span>
          <div className="inline-flex rounded-lg bg-white/5 p-0.5 border border-white/10">
            <button
              onClick={() => setViewState('normal')}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-colors ${viewState === 'normal' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Normal View
            </button>
            <button
              onClick={() => setViewState('empty')}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-colors ${viewState === 'empty' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Empty State
            </button>
            <button
              onClick={() => setViewState('loading')}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 hover:text-white"
            >
              Skeleton Loading
            </button>
            <button
              onClick={() => setViewState('error')}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 hover:text-white"
            >
              Error State
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerLevelUp(level)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Level Up</span>
          </button>
          <button
            onClick={toggleSound}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isMuted ? 'Muted' : 'Sound FX On'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Top Header (Page 33 Screen 1) */}
      <header className="flex md:hidden px-4 pt-4 pb-3 items-center justify-between border-b border-white/5 sticky top-0 z-30 backdrop-blur-xl bg-[#161827]/90">
        <button 
          onClick={() => setDrawerOpen(true)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-extrabold text-white font-display tracking-tight">
            Good Morning, <span className="text-amber-400">VeLooper!</span>
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
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <button 
            onClick={() => onNavigate('activity')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors relative"
          >
            <Bell className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#161827]" />
          </button>
        </div>
      </header>

      {/* Main Responsive Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        
        {/* ROW 1: Current Level Hero + XP Progress & Next Locked Reward */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* MAIN LEVEL HERO CARD (Page 33 Screen 1 Exact Match) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
            <div 
              className="rounded-3xl p-5 sm:p-6 border relative overflow-hidden h-full flex flex-col justify-between transition-all"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(245, 158, 11, 0.45)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Ambient radial gold glow */}
              <div 
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                  filter: 'blur(45px)'
                }}
              />

              <div>
                {/* Level Badge + Numerical XP */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 relative z-10 my-2">
                  {/* Octagon Badge with LEVEL 05 */}
                  <div 
                    className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    onClick={() => triggerLevelUp(level)}
                    title="Click to preview celebration"
                  >
                    <OctagonBadge level={level} size={102} />
                  </div>

                  {/* XP Values and Progress */}
                  <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-display leading-none block">
                          {currentXP.toLocaleString()} XP
                        </span>
                        <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">
                          to reach Level {String(level + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Required XP calculation */}
                      <div className="mt-2 sm:mt-0 p-2 sm:p-2.5 rounded-xl bg-[#121524] border border-white/5 inline-block self-center sm:self-auto text-center sm:text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                          XP Needed
                        </span>
                        <span className="text-xs sm:text-sm font-black text-amber-300 font-display block">
                          {xpNeeded.toLocaleString()} XP to Level {String(level + 1).padStart(2, '0')}
                        </span>
                      </div>
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
                        <span>{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
                        <span className="text-amber-400 font-black">{xpPercentage}% Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Hero */}
              <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <span className="text-amber-400">💡</span>
                  <span>Next milestone unlocks <strong>500 VEs</strong> and <strong>2X Arcade Boost</strong>.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('game')}
                    className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Play XP Catcher</span>
                  </button>
                  <button
                    onClick={() => onNavigate('map')}
                    className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Map className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Saga Realm Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT LEVEL REWARD & LOCKED REWARD CARD */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
            <LockedNextReward 
              currentLevel={level}
              currentXP={currentXP}
              nextLevelXP={nextLevelXP}
              onClaim={() => triggerLevelUp(level)}
            />
          </div>
        </div>

        {/* ⚡ TODAY'S BOOST (3 Cards - Exact match to Page 33 Screen 1) */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5 px-1">
            <span className="text-amber-400 text-sm">⚡</span>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 font-display">
              TODAY'S BOOST
            </h2>
            <span className="text-xs text-slate-400 ml-auto font-medium">Daily Reset in 12h</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: XP Earned */}
            <div 
              className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="p-2.5 rounded-2xl bg-purple-500/10">
                <PurpleStarGem size={28} />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">XP Earned</span>
                <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{todayXP} XP</span>
              </div>
            </div>

            {/* Card 2: Tasks Done */}
            <div 
              className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="p-2.5 rounded-2xl bg-blue-500/10">
                <TasksClipboard size={28} />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Tasks Done</span>
                <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{tasksDone} / {tasksTotal}</span>
              </div>
            </div>

            {/* Card 3: Streak */}
            <div 
              className="p-4 rounded-2xl border flex items-center sm:flex-col justify-start sm:justify-center text-left sm:text-center gap-3 transition-all hover:border-amber-400/40 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="p-2.5 rounded-2xl bg-orange-500/10">
                <StreakFlame size={28} />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Streak</span>
                <span className="text-base sm:text-lg font-black text-white mt-0.5 block">{streakDays} Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEVEL PROGRESSION ROADMAP */}
        <LevelRoadmap currentLevel={level} onSelectLevel={(lvl) => triggerLevelUp(lvl)} />

        {/* PERSONALIZED RECOMMENDATION BANNER */}
        <div 
          className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
          style={{
            background: 'linear-gradient(135deg, #1C2038 0%, #161827 100%)',
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-xl flex-shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-display">
                  Recommended For You
                </h3>
                <span className="px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                  Fast Level-Up
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                You're only <span className="text-amber-400 font-bold">{xpNeeded.toLocaleString()} XP</span> away from Level {String(level + 1).padStart(2, '0')}. Complete today's daily mission or play XP Catcher to reach your next level!
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('earn')}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
          >
            <span>Start Challenge →</span>
          </button>
        </div>

        {/* PLAY & EARN (Left) + RECENT ACTIVITY (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* PLAY & EARN MINI GAME CARD */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div 
              className="rounded-3xl p-5 border relative overflow-hidden h-full flex flex-col justify-between"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(245, 158, 11, 0.35)',
                boxShadow: '0 14px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-display">
                      PLAY & EARN ARCADE
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                    18-Second Challenge
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  XP Catcher Arena
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Catch falling purple XP orbs, golden VE coins, and rare emerald crystals with your golden basket. Win XP and eligible platform tokens!
                </p>

                <div className="my-4 p-3.5 rounded-2xl bg-[#090B14] border border-white/5 flex items-center justify-around text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">BEST SCORE</span>
                    <span className="text-xl font-black text-amber-400 font-display">92 PTS</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">MULTIPLIER</span>
                    <span className="text-xl font-black text-purple-400 font-display">2.0X</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">AVG REWARD</span>
                    <span className="text-xl font-black text-emerald-400 font-display">+30 XP</span>
                  </div>
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
                <span>Launch XP Catcher Game</span>
              </button>
            </div>
          </div>

          {/* RECENT XP ACTIVITY LEDGER */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div 
              className="rounded-3xl p-5 border relative overflow-hidden h-full flex flex-col justify-between"
              style={{
                backgroundColor: '#1A1D30',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 14px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-300 font-display">
                    RECENT XP ACTIVITY
                  </span>
                  <button
                    onClick={() => onNavigate('activity')}
                    className="text-[11px] font-bold text-amber-400 hover:underline"
                  >
                    View All Activity →
                  </button>
                </div>

                {viewState === 'empty' ? (
                  <EmptyActivityState onStartEarning={() => onNavigate('earn')} />
                ) : (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🎯</span>
                        <div>
                          <span className="text-xs font-bold text-white block">Referral Bonus</span>
                          <span className="text-[10px] text-slate-400">Today, 10:45 AM</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">+20 XP</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">📋</span>
                        <div>
                          <span className="text-xs font-bold text-white block">Daily Mission Completed</span>
                          <span className="text-[10px] text-slate-400">Today, 09:12 AM</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-amber-400">+50 XP</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🪙</span>
                        <div>
                          <span className="text-xs font-bold text-white block">XP Catcher Reward</span>
                          <span className="text-[10px] text-slate-400">Today, 07:50 AM</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-amber-400">+10 VEs</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Today's summary pill */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Today's Total Earned:</span>
                <span className="text-amber-400">{todayXP} XP & {todayVEs} VEs</span>
              </div>
            </div>
          </div>
        </div>

        {/* EARN MORE (Page 33 Screen 1 Exact 6 Icons Grid) */}
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
                    backgroundColor: item.highlight ? '#20243C' : '#1A1D30',
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
            backgroundColor: '#1A1D30',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center justify-between relative z-10 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  Level 05 Rewards
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                  UNLOCKED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Amazing rewards await you! Click to claim coins & rare crystals.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline pt-1">
                <span>View Rewards</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            <div className="flex-shrink-0 transition-transform group-hover:scale-110">
              <TreasureChest size={84} />
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
            className="relative w-72 max-w-[80%] h-full bg-[#1A1D30] border-r border-white/10 p-5 flex flex-col justify-between z-10 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <OctagonBadge level={level} size={46} />
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
                  onClick={() => { setDrawerOpen(false); onNavigate('showcase'); }}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-amber-400 flex items-center justify-between"
                >
                  <span>Page 33 6-Screen Matrix</span>
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
