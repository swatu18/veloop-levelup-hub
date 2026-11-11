import React, { useState } from 'react';
import { ArrowLeft, Play, CheckSquare, Users, Trophy, Flame, Gamepad2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const EarnPage = ({ onBack, onNavigateGame }) => {
  const { addXP, recordActivity } = useDashboard();
  const [completedTasks, setCompletedTasks] = useState({});

  const tasks = [
    {
      id: 'watch',
      title: 'Watch & Earn',
      desc: 'Watch a 15-second sponsor spotlight',
      rewardXP: 50,
      icon: Play,
      iconColor: '#A855F7',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'rgba(168, 85, 247, 0.25)',
      actionType: 'watch'
    },
    {
      id: 'missions',
      title: 'Daily Missions',
      desc: 'Complete all 4 routine tasks for today',
      rewardXP: 30,
      icon: CheckSquare,
      iconColor: '#F59E0B',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.25)',
      actionType: 'task'
    },
    {
      id: 'refer',
      title: 'Refer & Earn',
      desc: 'Invite friends and earn bonus experience',
      rewardXP: 100,
      icon: Users,
      iconColor: '#10B981',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.25)',
      actionType: 'refer'
    },
    {
      id: 'minigames',
      title: 'Mini Games',
      desc: 'Compete in community challenge puzzles',
      rewardXP: 75,
      icon: Trophy,
      iconColor: '#38BDF8',
      iconBg: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.25)',
      actionType: 'game'
    },
    {
      id: 'streak',
      title: 'Streak Bonus',
      desc: 'Check in consecutive days for multiplier',
      rewardXP: 25,
      icon: Flame,
      iconColor: '#F97316',
      iconBg: 'rgba(249, 115, 22, 0.15)',
      borderColor: 'rgba(249, 115, 22, 0.25)',
      actionType: 'streak'
    },
    {
      id: 'catcher',
      title: 'XP Catcher',
      desc: 'Catch falling orbs and tokens in arcade mode',
      rewardXP: 10,
      icon: Gamepad2,
      iconColor: '#FBBF24',
      iconBg: 'rgba(251, 191, 36, 0.2)',
      borderColor: 'rgba(251, 191, 36, 0.45)',
      actionType: 'play_catcher',
      isPlay: true
    }
  ];

  const handleClaimTask = (task) => {
    if (task.actionType === 'play_catcher') {
      onNavigateGame();
      return;
    }

    if (completedTasks[task.id]) return;

    addXP(task.rewardXP);
    recordActivity(task.title, task.actionType, `+${task.rewardXP} XP`, 'zap', true);
    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-white font-display">
            EARN & LEVEL UP
          </h1>
          <p className="text-[11px] text-slate-400">Complete tasks to level up faster</p>
        </div>
      </div>

      {/* Task Cards List */}
      <div className="my-4 space-y-2.5 flex-1">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isDone = completedTasks[task.id];

          return (
            <div
              key={task.id}
              onClick={() => handleClaimTask(task)}
              className="p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group hover:border-amber-400/40"
              style={{
                backgroundColor: '#151824',
                borderColor: isDone ? 'rgba(16, 185, 129, 0.3)' : task.borderColor
              }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Square Left Icon */}
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: task.iconBg,
                    border: `1px solid ${task.borderColor}`
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: task.iconColor }} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {task.desc}
                  </p>
                </div>
              </div>

              {/* Reward Badge / Claim Button */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {isDone ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Done</span>
                  </span>
                ) : task.isPlay ? (
                  <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <span>PLAY</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-xs font-black text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-xl border border-amber-500/30">
                    +{task.rewardXP} XP
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Footer Card */}
      <div 
        className="p-4 rounded-2xl border text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #181C2E 0%, #151824 100%)',
          borderColor: 'rgba(245, 158, 11, 0.25)'
        }}
      >
        <span className="text-lg">💪</span>
        <h4 className="text-sm font-black text-white mt-1">
          Keep going! You're doing great!
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Reach Level 06 to unlock Diamond Champions League rewards
        </p>
      </div>
    </div>
  );
};
export default EarnPage;
