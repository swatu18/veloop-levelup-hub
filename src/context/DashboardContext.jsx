import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext(null);

const INITIAL_ACTIVITIES = [
  { id: 'act_1', title: 'Referral Bonus', type: 'referral', amount: '+20 XP', time: '10 mins ago', icon: 'users', isXP: true },
  { id: 'act_2', title: 'Daily Mission Completed', type: 'mission', amount: '+50 XP', time: '1 hour ago', icon: 'check-circle', isXP: true },
  { id: 'act_3', title: 'Mini Game Victory', type: 'game', amount: '+75 XP', time: '3 hours ago', icon: 'gamepad-2', isXP: true },
  { id: 'act_4', title: 'Task Milestone Reward', type: 've', amount: '+10 VEs', time: '5 hours ago', icon: 'coins', isXP: false },
  { id: 'act_5', title: '7-Day Streak Achieved', type: 'streak', amount: '+25 XP', time: 'Yesterday', icon: 'flame', isXP: true },
];

export const DashboardProvider = ({ children }) => {
  const [level, setLevel] = useState(5);
  const [currentXP, setCurrentXP] = useState(6420);
  const [nextLevelXP, setNextLevelXP] = useState(8000);
  const [veBalance, setVeBalance] = useState(1420);
  const [gemBalance, setGemBalance] = useState(45);
  const [streakDays, setStreakDays] = useState(7);
  const [tasksDone, setTasksDone] = useState(4);
  const [tasksTotal, setTasksTotal] = useState(8);
  const [todayXP, setTodayXP] = useState(215);
  const [todayVEs, setTodayVEs] = useState(35);
  
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);

  const addXP = (amount) => {
    setCurrentXP(prev => {
      const updated = prev + amount;
      if (updated >= nextLevelXP) {
        // level up!
        triggerLevelUp(level + 1);
      }
      return updated;
    });
    setTodayXP(prev => prev + amount);
  };

  const addVEs = (amount) => {
    setVeBalance(prev => prev + amount);
    setTodayVEs(prev => prev + amount);
  };

  const recordActivity = (title, type, amount, icon, isXP = true) => {
    const newAct = {
      id: 'act_' + Date.now(),
      title,
      type,
      amount,
      time: 'Just now',
      icon,
      isXP
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const triggerLevelUp = (newLevel = 5) => {
    setLevel(newLevel);
    setLevelUpData({
      level: newLevel,
      veReward: 500,
      gemReward: 25,
      perks: [
        '+15% Multiplier on all Daily Challenges',
        'Unlocked Exclusive Level 05 Rewards Vault',
        'Priority Access to VIP Tournaments & Events'
      ]
    });
    setIsLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  return (
    <DashboardContext.Provider value={{
      level,
      currentXP,
      nextLevelXP,
      veBalance,
      gemBalance,
      streakDays,
      tasksDone,
      tasksTotal,
      todayXP,
      todayVEs,
      activities,
      isLevelUpModalOpen,
      levelUpData,
      addXP,
      addVEs,
      recordActivity,
      triggerLevelUp,
      closeLevelUpModal
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
};
