import React from 'react';
import { OctagonBadge } from '../badges/OctagonBadge';
import { StarCrestBadge } from '../badges/StarCrestBadge';
import { PedestalBadge } from '../badges/PedestalBadge';
import { TreasureChest } from '../illustrations/TreasureChest';
import { CoinPile } from '../illustrations/CoinPile';
import { 
  PurpleStarGem, TasksClipboard, StreakFlame, 
  HorseshoeMagnet, Gamepad3D, ReferFriends3D, WatchPlay3D 
} from '../illustrations/GamingIcons';
import { 
  Menu, Bell, ArrowRight, ArrowLeft, Info, Share2, 
  ChevronRight, Check, Sparkles, Filter, Home, DollarSign, 
  Gift, Wallet, User, BarChart2, Play 
} from 'lucide-react';

export const Page33Showcase = ({ onSelectScreen }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 text-white">
      {/* Title & Description */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Page 33 Specification Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
          Exact 6-Screen Architecture Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-1.5">
          Pixel-matched side-by-side verification of all 6 screens from the design assignment. Click any mobile frame to open that screen interactively in live mode.
        </p>
      </div>

      {/* 6 Mobile Devices Grid (2 rows x 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* ================= SCREEN 1: DASHBOARD HOME ================= */}
        <div 
          onClick={() => onSelectScreen('home')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#0D0E15] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 1: Home
          </div>

          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <Menu className="w-5 h-5 text-slate-300" />
              <div className="text-center">
                <span className="text-xs font-black text-white block">Good Morning, VeLooper!</span>
                <span className="text-[9px] text-slate-400 block">Level up your journey and unlock epic rewards</span>
              </div>
              <Bell className="w-5 h-5 text-slate-300" />
            </div>

            {/* Hero Card */}
            <div className="mt-3.5 p-3.5 rounded-2xl bg-[#121524] border border-amber-400/40 relative">
              <div className="flex items-center gap-3">
                <OctagonBadge level={5} size={70} />
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-black text-amber-400 leading-none">6,420 XP</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">to reach Level 06</div>
                  <div className="mt-2.5">
                    <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10">
                      <div className="w-[80%] h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-bold">
                      <span>6,420 / 8,000 XP</span>
                      <span className="text-amber-400">80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Boost */}
            <div className="mt-3.5">
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-400 uppercase tracking-wider mb-2">
                <span>⚡</span>
                <span className="text-slate-200">TODAY'S BOOST</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#121524] border border-white/5 text-center">
                  <div className="flex justify-center mb-1"><PurpleStarGem size={22} /></div>
                  <div className="text-[9px] text-slate-400">XP Earned</div>
                  <div className="text-xs font-black text-white mt-0.5">215 XP</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121524] border border-white/5 text-center">
                  <div className="flex justify-center mb-1"><TasksClipboard size={22} /></div>
                  <div className="text-[9px] text-slate-400">Tasks Done</div>
                  <div className="text-xs font-black text-white mt-0.5">4 / 8</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121524] border border-white/5 text-center">
                  <div className="flex justify-center mb-1"><StreakFlame size={22} /></div>
                  <div className="text-[9px] text-slate-400">Streak</div>
                  <div className="text-xs font-black text-white mt-0.5">7 Days</div>
                </div>
              </div>
            </div>

            {/* Earn More Grid */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-300 mb-2">
                <span>EARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Watch & Earn', icon: WatchPlay3D },
                  { name: 'Daily Tasks', icon: TasksClipboard },
                  { name: 'Refer & Earn', icon: ReferFriends3D },
                  { name: 'XP Catcher', icon: HorseshoeMagnet },
                  { name: 'Mini Games', icon: Gamepad3D },
                  { name: 'Streak Bonus', icon: StreakFlame },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-2 rounded-xl bg-[#121524] border border-white/5 flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-1"><Icon size={24} /></div>
                      <span className="text-[9px] font-bold text-slate-200 leading-tight">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level 05 Rewards Banner */}
            <div className="mt-3.5 p-3 rounded-2xl bg-[#121524] border border-amber-400/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-white">Level 05 Rewards</div>
                <div className="text-[9px] text-slate-400">Amazing rewards await you!</div>
                <div className="text-[10px] font-bold text-amber-400 mt-1 flex items-center gap-0.5">
                  <span>View Rewards</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
              <TreasureChest size={48} />
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-around text-slate-400">
            <div className="flex flex-col items-center text-amber-400"><Home className="w-4 h-4 stroke-[2.5]" /><span className="text-[8px] mt-0.5 font-bold">Home</span></div>
            <div className="flex flex-col items-center"><DollarSign className="w-4 h-4" /><span className="text-[8px] mt-0.5">Earn</span></div>
            <div className="flex flex-col items-center"><Gift className="w-4 h-4" /><span className="text-[8px] mt-0.5">Rewards</span></div>
            <div className="flex flex-col items-center"><Wallet className="w-4 h-4" /><span className="text-[8px] mt-0.5">Wallet</span></div>
            <div className="flex flex-col items-center"><User className="w-4 h-4" /><span className="text-[8px] mt-0.5">Profile</span></div>
          </div>
        </div>

        {/* ================= SCREEN 2: XP CATCHER MINI GAME ================= */}
        <div 
          onClick={() => onSelectScreen('game')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#090B14] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 2: XP Catcher
          </div>

          <div>
            {/* Game Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
              <div className="flex items-center gap-1">
                <span className="text-xs font-black uppercase text-white font-display">XP CATCHER</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="px-2 py-0.5 rounded-full bg-white/10 text-amber-400 text-[10px] font-mono font-bold">
                ⏱ 00:18
              </div>
            </div>

            <div className="text-center mt-2 mb-4">
              <p className="text-[10px] text-slate-400">
                Catch XP orbs & coins. Score high for better rewards!
              </p>
            </div>

            {/* Falling items playfield preview */}
            <div className="h-72 w-full rounded-2xl bg-[#0F111E] border border-white/5 relative overflow-hidden flex flex-col justify-between p-4">
              {/* Falling Coins and Orbs */}
              <div className="relative h-44 w-full">
                {/* Purple XP Orb */}
                <div className="absolute top-2 left-6 w-8 h-8 rounded-full bg-purple-600 border border-purple-300 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-purple-500/50">
                  XP
                </div>
                {/* Gold V-Coin */}
                <div className="absolute top-6 right-16 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 border border-yellow-200 flex items-center justify-center text-xs font-black text-amber-950 shadow-lg shadow-amber-500/50">
                  V
                </div>
                {/* Green Gem */}
                <div className="absolute top-16 left-28 w-6 h-6 rotate-45 bg-emerald-500 border border-emerald-200 shadow-lg shadow-emerald-500/50" />
                {/* Second XP Orb */}
                <div className="absolute top-24 right-8 w-8 h-8 rounded-full bg-purple-600 border border-purple-300 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-purple-500/50">
                  XP
                </div>
                {/* Floating score text */}
                <div className="absolute bottom-4 right-12 text-xs font-black text-amber-400 animate-bounce">
                  +10 XP
                </div>
              </div>

              {/* Gold Basket Collector */}
              <div className="flex justify-center">
                <div className="w-28 h-8 rounded-full border-2 border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-400/50 flex items-center justify-center text-[9px] font-black text-amber-300 tracking-wider">
                  GOLDEN BASKET
                </div>
              </div>
            </div>
          </div>

          {/* Footer Score & Perks */}
          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">YOUR SCORE</span>
            <span className="text-3xl font-black text-amber-400 font-display block">120</span>
            <div className="flex items-center justify-center gap-3 mt-2 text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">🪙 +5 VEs</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300">🚀 2X Multiplier</span>
            </div>
          </div>
        </div>

        {/* ================= SCREEN 3: CHALLENGE COMPLETE ================= */}
        <div 
          onClick={() => onSelectScreen('game')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#0D0E15] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 3: Results
          </div>

          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
              <Share2 className="w-5 h-5 text-slate-300" />
            </div>

            <div className="text-center mt-2">
              <h3 className="text-sm font-black text-amber-400 uppercase font-display tracking-wider">CHALLENGE COMPLETE!</h3>
              <p className="text-[11px] text-white font-semibold mt-0.5">Outstanding!</p>
            </div>

            {/* Grand Star Trophy Laurel Wreath */}
            <div className="my-3 flex justify-center">
              <StarCrestBadge size={115} />
            </div>

            {/* Score */}
            <div className="text-center mb-3">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">FINAL SCORE</span>
              <div className="flex items-center justify-center gap-2 mt-0.5">
                <span className="text-3xl font-black text-amber-400 font-display">92</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black border border-emerald-500/40">New Best!</span>
              </div>
            </div>

            {/* Rewards Dual Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-[#121524] border border-white/5 text-center">
                <span className="text-sm font-black text-white block">+30 XP</span>
                <span className="text-[9px] text-slate-400 font-medium">Experience</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121524] border border-white/5 text-center">
                <span className="text-sm font-black text-amber-400 block">+12 VEs</span>
                <span className="text-[9px] text-slate-400 font-medium">Your Reward</span>
              </div>
            </div>

            {/* Mini Progress */}
            <div className="text-[9px] text-slate-400 font-bold mb-1 flex justify-between">
              <span>Level 05</span>
              <span>Level 06</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
              <div className="w-[80%] h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
            </div>
            <div className="text-center text-[9px] text-slate-400 mt-1 font-bold">
              6,420 / 8,000 XP
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-3">
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
              Play Again
            </button>
            <button className="w-full py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs hover:bg-white/10">
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* ================= SCREEN 4: EARN & LEVEL UP ================= */}
        <div 
          onClick={() => onSelectScreen('earn')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#0D0E15] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 4: Earn Hub
          </div>

          <div>
            {/* Top Bar */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
              <div>
                <h3 className="text-xs font-black uppercase text-white font-display">EARN & LEVEL UP</h3>
                <p className="text-[9px] text-slate-400">Complete activities. Earn XP. Climb levels.</p>
              </div>
            </div>

            {/* List of 6 Quests */}
            <div className="space-y-2 mt-3">
              {[
                { title: 'Watch & Earn', sub: 'Watch ads and earn', xp: '+50 XP', icon: WatchPlay3D },
                { title: 'Daily Missions', sub: 'Complete daily tasks', xp: '+30 XP', icon: TasksClipboard },
                { title: 'Refer & Earn', sub: 'Invite friends & earn', xp: '+100 XP', icon: ReferFriends3D },
                { title: 'Mini Games', sub: 'Play games & win', xp: '+75 XP', icon: Gamepad3D },
                { title: 'Streak Bonus', sub: 'Maintain your streak', xp: '+25 XP', icon: StreakFlame },
                { title: 'XP Catcher', sub: 'Catch orbs & coins', xp: '+10 XP', icon: HorseshoeMagnet },
              ].map((task, idx) => {
                const Icon = task.icon;
                return (
                  <div key={idx} className="p-2 rounded-xl bg-[#121524] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex items-center justify-center"><Icon size={22} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-white leading-tight">{task.title}</div>
                        <div className="text-[9px] text-slate-400">{task.sub}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-black text-amber-400">{task.xp}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivation Footer */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-300">
            <span>Keep going! You're doing great!</span>
            <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* ================= SCREEN 5: LEVEL UP CELEBRATION ================= */}
        <div 
          onClick={() => onSelectScreen('home')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#0E111E] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group text-center"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 5: Level Up
          </div>

          <div>
            <div className="pt-2">
              <h3 className="text-xl font-black text-amber-400 font-display uppercase tracking-tight">LEVEL UP!</h3>
              <p className="text-[11px] text-white font-medium mt-0.5">You've reached</p>
            </div>

            {/* Pedestal Badge */}
            <div className="my-2 flex justify-center">
              <PedestalBadge level={5} size={95} />
            </div>

            {/* Dual Rewards Unlocked */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 rounded-xl bg-[#141829] border border-white/5 text-center">
                <span className="text-xs font-black text-amber-400 block">+500 VEs</span>
                <div className="my-1 flex justify-center"><CoinPile size={38} /></div>
              </div>
              <div className="p-2 rounded-xl bg-[#141829] border border-white/5 text-center">
                <span className="text-xs font-black text-purple-400 block">+25 Gems</span>
                <div className="my-1 flex justify-center text-xl">💎</div>
              </div>
            </div>

            {/* Perks list */}
            <div className="p-2 rounded-xl bg-white/5 text-left space-y-1.5 text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Check className="w-3 h-3 text-amber-400" />
                <span>Higher daily XP limit</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Check className="w-3 h-3 text-amber-400" />
                <span>Access to new challenges</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Check className="w-3 h-3 text-amber-400" />
                <span>Better reward opportunities</span>
              </div>
            </div>
          </div>

          {/* Claim Button */}
          <div className="mt-3">
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30">
              Claim Rewards
            </button>
          </div>
        </div>

        {/* ================= SCREEN 6: RECENT ACTIVITY ================= */}
        <div 
          onClick={() => onSelectScreen('activity')}
          className="rounded-[36px] p-4 border border-amber-400/30 bg-[#0D0E15] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400 hover:scale-[1.01] group"
          style={{ minHeight: '640px' }}
        >
          <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider z-20">
            Screen 6: Activity
          </div>

          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
              <h3 className="text-xs font-black uppercase text-white font-display">RECENT ACTIVITY</h3>
              <Filter className="w-4 h-4 text-slate-300" />
            </div>

            {/* Transaction List */}
            <div className="space-y-2 mt-3">
              {[
                { title: 'Referral Bonus', time: 'Today, 10:45 AM', amount: '+20 XP', color: 'text-emerald-400', icon: '🎯' },
                { title: 'Daily Mission Completed', time: 'Today, 09:12 AM', amount: '+50 XP', color: 'text-amber-400', icon: '📋' },
                { title: 'Mini Game Win', time: 'Today, 08:30 AM', amount: '+75 XP', color: 'text-purple-400', icon: '🎮' },
                { title: 'XP Catcher Reward', time: 'Today, 07:50 AM', amount: '+10 VEs', color: 'text-amber-400', icon: '🪙' },
                { title: 'Streak Bonus', time: 'Today, 07:20 AM', amount: '+25 XP', color: 'text-orange-400', icon: '🔥' },
              ].map((act, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-[#121524] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{act.icon}</span>
                    <div>
                      <div className="text-[11px] font-bold text-white leading-tight">{act.title}</div>
                      <div className="text-[9px] text-slate-400">{act.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-black ${act.color}`}>{act.amount}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Summary */}
          <div className="p-3 rounded-2xl bg-[#121524] border border-white/5 mt-3">
            <span className="text-[10px] font-bold text-slate-400 block mb-2">Today's Summary</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[9px] font-black">XP</span>
                <div>
                  <span className="text-xs font-black text-white block">215 XP</span>
                  <span className="text-[8px] text-slate-400">Total Earned</span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[9px] font-black">V</span>
                <div>
                  <span className="text-xs font-black text-white block">35 VEs</span>
                  <span className="text-[8px] text-slate-400">Total Earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Page33Showcase;
