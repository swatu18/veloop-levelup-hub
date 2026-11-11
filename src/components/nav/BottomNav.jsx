import React from 'react';
import { Home, Zap, Gamepad2, Map, History } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: Zap },
    { id: 'game', label: 'Catcher', icon: Gamepad2, highlight: true },
    { id: 'map', label: 'Saga Map', icon: Map },
    { id: 'activity', label: 'Activity', icon: History },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-40 px-2 py-2 border-t flex items-center justify-around"
      style={{
        backgroundColor: 'rgba(10, 12, 20, 0.98)',
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
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.highlight && !isActive && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
            {isActive && (
              <span 
                className="absolute -top-2 w-5 h-1 rounded-full bg-amber-400"
                style={{ boxShadow: '0 0 10px #F59E0B' }}
              />
            )}
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
