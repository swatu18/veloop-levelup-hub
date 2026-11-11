import React, { useState } from 'react';
import { DashboardHome } from './DashboardHome';
import { GamePage } from '../game/GamePage';
import { EarnPage } from '../earn/EarnPage';
import { ActivityPage } from '../activity/ActivityPage';
import { SagaMap } from '../../components/map/SagaMap';
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
      {/* Dynamic Screen View */}
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

      {activeScreen === 'map' && (
        <SagaMap 
          onBack={() => setActiveScreen('home')} 
          onSelectLevel={(lvl) => triggerLevelUp(lvl)}
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

      {/* Bottom Nav Bar (Hidden during active canvas gameplay for immersion) */}
      {activeScreen !== 'game' && (
        <BottomNav activeTab={activeScreen} onTabChange={handleTabChange} />
      )}
    </div>
  );
};
export default Dashboard;
