import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle2, BarChart2, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  WatchPlay3D, TasksClipboard, ReferFriends3D, 
  Gamepad3D, StreakFlame, HorseshoeMagnet 
} from '../../components/illustrations/GamingIcons';
import { sounds } from '../../utils/sound';

export const EarnPage = ({ onBack, onNavigateGame }) => {
  const { addXP, recordActivity } = useDashboard();
  const [completedTasks, setCompletedTasks] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const tasks = [
    {
      id: 'watch',
      title: 'Watch & Earn',
      desc: 'Watch ads and earn',
      reward: '+50 XP',
      rewardVal: 50,
      icon: WatchPlay3D,
      action: 'watch'
    },
    {
      id: 'missions',
      title: 'Daily Missions',
      desc: 'Complete daily tasks',
      reward: '+30 XP',
      rewardVal: 30,
      icon: TasksClipboard,
      action: 'task'
    },
    {
      id: 'refer',
      title: 'Refer & Earn',
      desc: 'Invite friends & earn',
      reward: '+100 XP',
      rewardVal: 100,
      icon: ReferFriends3D,
      action: 'refer'
    },
    {
      id: 'minigames',
      title: 'Mini Games',
      desc: 'Play games & win',
      reward: '+75 XP',
      rewardVal: 75,
      icon: Gamepad3D,
      action: 'game'
    },
    {
      id: 'streak',
      title: 'Streak Bonus',
      desc: 'Maintain your streak',
      reward: '+25 XP',
      rewardVal: 25,
      icon: StreakFlame,
      action: 'streak'
    },
    {
      id: 'catcher',
      title: 'XP Catcher',
      desc: 'Catch orbs & coins',
      reward: '+10 XP',
      rewardVal: 10,
      icon: HorseshoeMagnet,
      action: 'catcher',
      isPlay: true
    }
  ];

  const handleTaskClick = (task) => {
    if (task.isPlay) {
      onNavigateGame();
      return;
    }

    if (completedTasks[task.id]) {
      setToastMessage(`Already completed today!`);
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }

    sounds.playCoin();
    addXP(task.rewardVal);
    recordActivity(task.title, task.action, task.reward, 'zap', true);
    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
    setToastMessage(`Awesome! ${task.reward} added to your account!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div 
      className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" 
      style={{ backgroundColor: '#0D0E15', minHeight: '100vh' }}
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div>
          <h1 className="text-sm font-black tracking-wider text-white font-display uppercase">
            EARN & LEVEL UP
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Complete activities. Earn XP. Climb levels. Get rewards.
          </p>
        </div>
      </div>

      {/* Toast alert */}
      {toastMessage && (
        <div className="my-2 p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6 High-Contrast Quests List (Page 33 Screen 4) */}
      <div className="space-y-2.5 my-3">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isDone = completedTasks[task.id];

          return (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                isDone 
                  ? 'border-emerald-500/30 bg-[#0E171E] opacity-80' 
                  : 'border-white/5 bg-[#121524] hover:border-amber-400/40 hover:-translate-y-0.5 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-black/40 flex items-center justify-center p-1.5 flex-shrink-0 transition-transform group-hover:scale-110">
                  <Icon size={30} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white font-display tracking-tight leading-none">
                    {task.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    {task.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isDone ? (
                  <span className="flex items-center gap-1 text-xs font-black text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CLAIMED</span>
                  </span>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm font-black text-amber-400 font-display">
                      {task.reward}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Footer (Page 33 Screen 4) */}
      <div className="mt-auto pt-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 text-center">
          <span>Keep going! You're doing great!</span>
          <BarChart2 className="w-4 h-4 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
export default EarnPage;
