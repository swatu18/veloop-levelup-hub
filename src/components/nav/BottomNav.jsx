import React from 'react';
import { Home, DollarSign, Gift, Wallet, User } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange, onOpenProfile }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: DollarSign },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'activity', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'profile' && onOpenProfile) {
      onOpenProfile();
      return;
    }
    onTabChange(tabId);
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-40 px-2 py-2 border-t flex items-center justify-around"
      style={{
        backgroundColor: 'rgba(22, 24, 39, 0.96)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        paddingBottom: 'calc(0.4rem + var(--safe-bottom))'
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <span 
                className="absolute -top-2 w-4 h-1 rounded-full bg-amber-400"
                style={{ boxShadow: '0 0 10px #F59E0B' }}
              />
            )}
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4] text-amber-400' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
