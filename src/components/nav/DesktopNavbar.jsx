import React from 'react';
import { Home, Gamepad2, Map, Zap, History, Volume2, VolumeX, Bell, User, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../utils/sound';

export const DesktopNavbar = ({ activeTab, onTabChange }) => {
  const { level, veBalance, gemBalance, streakDays, triggerLevelUp } = useDashboard();
  const { user } = useAuth();
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setIsMuted(!sounds.enabled);
    if (sounds.enabled) sounds.playCoin();
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'game', label: 'XP Catcher Arcade', icon: Gamepad2, highlight: true },
    { id: 'map', label: '30-Level Saga Map', icon: Map },
    { id: 'earn', label: 'Earn & Quests', icon: Zap },
    { id: 'activity', label: 'Activity Ledger', icon: History },
    { id: 'showcase', label: 'Page 33 Matrix', icon: Sparkles },
  ];

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl bg-[#121422]/95">
      {/* Left: Branding & Level */}
      <div className="flex items-center gap-4">
        <div 
          onClick={() => onTabChange('home')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[14px] bg-[#0E111E] flex items-center justify-center font-black text-amber-400 text-sm">
              05
            </div>
          </div>
          <div>
            <span className="text-base font-black text-white tracking-tight font-display flex items-center gap-1.5">
              VeLoop <span className="text-amber-400">Rewards</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider block uppercase">
              Gaming Level-Up Hub
            </span>
          </div>
        </div>
      </div>

      {/* Center: Desktop Navigation Links */}
      <nav className="flex items-center gap-1.5 bg-[#121524] p-1.5 rounded-2xl border border-white/5 shadow-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl font-bold text-xs transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span>{item.label}</span>
              {item.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Live Gaming Balances & Profile */}
      <div className="flex items-center gap-3">
        {/* VEs balance */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-black">
          <span>🪙</span>
          <span>{veBalance.toLocaleString()} VEs</span>
        </div>

        {/* Gems balance */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-black">
          <span>💎</span>
          <span>{gemBalance} Gems</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-bold">
          <span>🔥</span>
          <span>{streakDays}d</span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:text-amber-400 text-slate-300 transition-colors"
          title="Toggle Sound"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Level Up celebration trigger */}
        <button
          onClick={() => triggerLevelUp(level)}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Claim Vault</span>
        </button>
      </div>
    </header>
  );
};
export default DesktopNavbar;
