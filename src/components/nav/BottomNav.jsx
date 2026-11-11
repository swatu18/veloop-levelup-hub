import React from 'react';
import { Home, Zap, Gift, Wallet, User } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: Zap },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'activity', label: 'Activity', icon: User },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-40 px-3 py-2 border-t flex items-center justify-around"
      style={{
        backgroundColor: 'rgba(17, 19, 29, 0.96)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        paddingBottom: 'calc(0.5rem + var(--safe-bottom))'
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <span 
                className="absolute -top-2 w-6 h-1 rounded-full bg-amber-400"
                style={{ boxShadow: '0 0 10px #F59E0B' }}
              />
            )}
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
