import React, { useState } from 'react';
import { DashboardHome } from './DashboardHome';
import { GamePage } from '../game/GamePage';
import { EarnPage } from '../earn/EarnPage';
import { ActivityPage } from '../activity/ActivityPage';
import { BottomNav } from '../../components/nav/BottomNav';
import { LevelUpModal } from '../../components/levelup/LevelUpModal';
import { useDashboard } from '../../context/DashboardContext';

export const Dashboard = () => {
  // activeScreen: 'home' | 'game' | 'earn' | 'activity'
  const [activeScreen, setActiveScreen] = useState('home');
  const { isLevelUpModalOpen, closeLevelUpModal, level, triggerLevelUp } = useDashboard();

  const screens = [
    { id: 'home', label: '1: Dashboard' },
    { id: 'game', label: '2: XP Catcher' },
    { id: 'complete', label: '3: Complete' },
    { id: 'earn', label: '4: Earn Hub' },
    { id: 'levelup', label: '5: Level Up' },
    { id: 'activity', label: '6: Activity' },
  ];

  const handleScreenSwitch = (screenId) => {
    if (screenId === 'levelup') {
      triggerLevelUp(level);
    } else if (screenId === 'complete') {
      setActiveScreen('game');
    } else {
      setActiveScreen(screenId);
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'home') {
      setActiveScreen('home');
    } else if (tabId === 'earn') {
      setActiveScreen('earn');
    } else if (tabId === 'rewards') {
      triggerLevelUp(level);
    } else if (tabId === 'wallet' || tabId === 'profile') {
      setActiveScreen('activity');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen" style={{ backgroundColor: '#0D0E15' }}>
      {/* Sleek Top Reference Screen Switcher Bar */}
      <div 
        className="sticky top-0 z-40 px-2 py-1.5 border-b flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: '#090B12',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest pl-1.5 flex-shrink-0">
          PAGE 33:
        </span>
        {screens.map(s => {
          const isActive = 
            (s.id === 'home' && activeScreen === 'home') ||
            (s.id === 'game' && activeScreen === 'game') ||
            (s.id === 'earn' && activeScreen === 'earn') ||
            (s.id === 'activity' && activeScreen === 'activity') ||
            (s.id === 'levelup' && isLevelUpModalOpen);

          return (
            <button
              key={s.id}
              onClick={() => handleScreenSwitch(s.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Screen Views */}
      {activeScreen === 'home' && (
        <DashboardHome onNavigate={(screen) => setActiveScreen(screen)} />
      )}

      {activeScreen === 'game' && (
        <GamePage onBack={() => setActiveScreen('home')} />
      )}

      {activeScreen === 'earn' && (
        <EarnPage 
          onBack={() => setActiveScreen('home')} 
          onNavigateGame={() => setActiveScreen('game')}
        />
      )}

      {activeScreen === 'activity' && (
        <ActivityPage onBack={() => setActiveScreen('home')} />
      )}

      {/* Screen 5: Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={closeLevelUpModal}
        level={level}
      />

      {/* Bottom Nav Bar (Hidden only during XP Catcher canvas game for immersion) */}
      {activeScreen !== 'game' && (
        <BottomNav activeTab={activeScreen} onTabChange={handleTabChange} />
      )}
    </div>
  );
};
export default Dashboard;
