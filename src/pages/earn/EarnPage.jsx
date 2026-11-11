import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  WatchPlay3D, TasksClipboard, ReferFriends3D, 
  Gamepad3D, StreakFlame, HorseshoeMagnet 
} from '../../components/illustrations/GamingIcons';

export const EarnPage = ({ onBack, onNavigateGame }) => {
  const { addXP, recordActivity } = useDashboard();
  const [completedTasks, setCompletedTasks] = useState({});

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

    if (completedTasks[task.id]) return;

    addXP(task.rewardVal);
    recordActivity(task.title, task.action, task.reward, 'zap', true);
    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
        <div>
          <h1 className="text-sm font-black tracking-tight text-white font-display uppercase">
            EARN & LEVEL UP
          </h1>
          <p className="text-[10px] text-slate-400">
            Complete activities. Earn XP. Climb levels. Get rewards.
          </p>
        </div>
      </div>

      {/* 6 Task Cards */}
      <div className="my-3 space-y-2 flex-1">
        {tasks.map((task) => {
          const IconComp = task.icon;
          const isDone = completedTasks[task.id];

          return (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group hover:border-amber-400/40"
              style={{
                backgroundColor: '#121524',
                borderColor: isDone ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <IconComp size={30} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate">
                    {task.desc}
                  </p>
                  <span className="text-[10px] font-black text-amber-400">
                    {task.reward}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 text-slate-400 group-hover:text-amber-400 transition-colors">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Footer Card with 3D Ascending Gold Bar Chart */}
      <div 
        className="p-3.5 rounded-2xl border flex items-center justify-between relative overflow-hidden"
        style={{
          backgroundColor: '#121524',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <span className="text-xs font-bold text-slate-200">
          Keep going! You're doing great!
        </span>

        {/* 3D Ascending Gold Bar Chart */}
        <div className="flex items-end gap-1.5 h-6 flex-shrink-0">
          <div className="w-2.5 h-3 rounded-t-sm bg-gradient-to-t from-amber-600 to-amber-400 shadow-sm" />
          <div className="w-2.5 h-4.5 rounded-t-sm bg-gradient-to-t from-amber-500 to-amber-300 shadow-sm" />
          <div className="w-2.5 h-6 rounded-t-sm bg-gradient-to-t from-amber-400 to-yellow-200 shadow-sm" />
        </div>
      </div>
    </div>
  );
};
export default EarnPage;
