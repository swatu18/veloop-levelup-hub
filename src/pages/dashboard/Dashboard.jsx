import React, { useState } from 'react';
import { DashboardHome } from './DashboardHome';
import { GamePage } from '../game/GamePage';
import { EarnPage } from '../earn/EarnPage';
import { ActivityPage } from '../activity/ActivityPage';
import { SagaMap } from '../../components/map/SagaMap';
import { DesktopNavbar } from '../../components/nav/DesktopNavbar';
import { BottomNav } from '../../components/nav/BottomNav';
import { LevelUpModal } from '../../components/levelup/LevelUpModal';
import { useDashboard } from '../../context/DashboardContext';

export const Dashboard = () => {
  // activeScreen: 'home' | 'game' | 'earn' | 'activity' | 'map'
  const [activeScreen, setActiveScreen] = useState('home');
  const { isLevelUpModalOpen, closeLevelUpModal, level, triggerLevelUp } = useDashboard();

  const handleTabChange = (tabId) => {
    setActiveScreen(tabId);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen" style={{ backgroundColor: '#07080E' }}>
      {/* Desktop & Tablet Top Gaming Navigation Bar */}
      <DesktopNavbar activeTab={activeScreen} onTabChange={handleTabChange} />

      {/* Screen Views (Responsive Width container on tablet & desktop) */}
      <div className="flex-1 flex flex-col w-full">
        {activeScreen === 'home' && (
          <DashboardHome onNavigate={(screen) => setActiveScreen(screen)} />
        )}

        {activeScreen === 'game' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <GamePage onBack={() => setActiveScreen('home')} />
          </div>
        )}

        {activeScreen === 'earn' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <EarnPage 
              onBack={() => setActiveScreen('home')} 
              onNavigateGame={() => setActiveScreen('game')}
            />
          </div>
        )}

        {activeScreen === 'map' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <SagaMap 
              onBack={() => setActiveScreen('home')} 
              onSelectLevel={(lvl) => triggerLevelUp(lvl)}
            />
          </div>
        )}

        {activeScreen === 'activity' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <ActivityPage onBack={() => setActiveScreen('home')} />
          </div>
        )}
      </div>

      {/* Screen 5: Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={closeLevelUpModal}
        level={level}
      />

      {/* Mobile-only Bottom Navigation Bar */}
      {activeScreen !== 'game' && (
        <BottomNav activeTab={activeScreen} onTabChange={handleTabChange} />
      )}
    </div>
  );
};
export default Dashboard;
