import React, { useState } from 'react';
import { DashboardHome } from './DashboardHome';
import { GamePage } from '../game/GamePage';
import { EarnPage } from '../earn/EarnPage';
import { ActivityPage } from '../activity/ActivityPage';
import { BottomNav } from '../../components/nav/BottomNav';
import { LevelUpModal } from '../../components/levelup/LevelUpModal';
import { useDashboard } from '../../context/DashboardContext';

export const Dashboard = () => {
  // activeScreen: 'home' | 'game' | 'earn' | 'activity' | 'wallet'
  const [activeScreen, setActiveScreen] = useState('home');
  const { isLevelUpModalOpen, closeLevelUpModal, level, triggerLevelUp } = useDashboard();

  const handleTabChange = (tabId) => {
    if (tabId === 'home') {
      setActiveScreen('home');
    } else if (tabId === 'earn') {
      setActiveScreen('earn');
    } else if (tabId === 'rewards') {
      triggerLevelUp(level);
    } else if (tabId === 'wallet') {
      setActiveScreen('activity');
    } else if (tabId === 'activity') {
      setActiveScreen('activity');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen" style={{ backgroundColor: '#0D0E15' }}>
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

      {activeScreen === 'activity' && (
        <ActivityPage onBack={() => setActiveScreen('home')} />
      )}

      {/* Screen 5: Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={closeLevelUpModal}
        level={level}
      />

      {/* Bottom Navigation (Hidden while playing game for immersion) */}
      {activeScreen !== 'game' && (
        <BottomNav activeTab={activeScreen} onTabChange={handleTabChange} />
      )}
    </div>
  );
};
export default Dashboard;
