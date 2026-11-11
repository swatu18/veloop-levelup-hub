import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Award, Check, ChevronRight, CircleHelp, Clock3, Coins, Flame, Gamepad2, Gift, LockKeyhole, Play, RotateCcw, Sparkles, Target, Users, Video, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { PedestalBadge } from '../../components/badges/PedestalBadge';
import styles from './LevelUpDashboard.module.css';

const levelNames = ['Explorer', 'Pathfinder', 'Wayfinder', 'Trailblazer', 'Pioneer', 'Luminary'];
const rewardSteps = [
  { level: 3, reward: '100 VEs', status: 'completed' },
  { level: 4, reward: '10 gems', status: 'completed' },
  { level: 5, reward: '500 VEs', status: 'completed' },
  { level: 6, reward: '500 VEs', status: 'next' },
  { level: 7, reward: '2 spins', status: 'locked' },
];

function MiniGame() {
  const [state, setState] = useState('ready');
  const [seconds, setSeconds] = useState(20);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(0);
  const isGameActive = state === 'playing' && seconds > 0;

  useEffect(() => {
    if (!isGameActive) return undefined;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isGameActive, seconds]);

  useEffect(() => {
    if (!isGameActive) return undefined;
    const movement = window.setInterval(() => setTarget((value) => value + 1), 850);
    return () => window.clearInterval(movement);
  }, [isGameActive]);

  const start = () => {
    setSeconds(20);
    setScore(0);
    setTarget(0);
    setState('playing');
  };

  return (
    <section className={`${styles.card} ${styles.gameCard}`} aria-labelledby="game-title">
      <div className={styles.sectionEyebrow}><span className={styles.liveDot} /> SKILL CHALLENGE <span className={styles.demoTag}>DEMO</span></div>
      <div className={styles.gameHeading}>
        <div><h2 id="game-title">VE Coin Catch</h2><p>Tap the moving token before it slips away. Every tap adds to your score.</p></div>
        <div className={styles.gameMark}><Gamepad2 size={22} /></div>
      </div>
      <div className={styles.gameStats}>
        <div><span>TIME LEFT</span><strong>{state === 'ready' ? '00:20' : `00:${String(seconds).padStart(2, '0')}`}</strong></div>
        <div><span>YOUR SCORE</span><strong>{score}</strong></div>
        <div><span>ATTEMPTS</span><strong>1 round</strong></div>
      </div>
      <div className={styles.playField}>
        {state === 'ready' && <div className={styles.gamePrompt}><Target size={28} /><strong>Ready when you are</strong><span>20 seconds · tap to collect · one demo round</span><button className={styles.primaryButton} onClick={start}><Play size={15} fill="currentColor" /> Start challenge</button></div>}
        {state === 'playing' && seconds > 0 && <button className={styles.token} style={{ left: `${15 + ((target * 29 + 19) % 68)}%`, top: `${18 + ((target * 31 + 12) % 52)}%` }} onClick={() => setScore((value) => value + 10)} aria-label="Collect the VE token"><Coins size={25} /></button>}
        {(state === 'complete' || (state === 'playing' && seconds <= 0)) && <div className={styles.gamePrompt}><div className={styles.resultBadge}><Award size={26} /></div><strong>Challenge complete</strong><span>You collected {score / 10} tokens and scored {score} points.</span><div className={styles.demoReward}>+25 XP <small>Demo reward · not credited to your account</small></div><button className={styles.secondaryButton} onClick={start}><RotateCcw size={15} /> Play again</button></div>}
      </div>
      <p className={styles.gameRule}><CircleHelp size={14} /> One 20-second round. Tap the token as it moves. Demo replays are unlimited; no reward eligibility is active and no wallet or XP is credited.</p>
    </section>
  );
}

export function LevelUpDashboard({ onNavigate, onPreviewLevelUp }) {
  const { user } = useAuth();
  const { level, currentXP, nextLevelXP, streakDays, tasksDone, tasksTotal, todayXP, activities } = useDashboard();
  const [selectedLevel, setSelectedLevel] = useState(level + 1);
  const [rewardRevealed, setRewardRevealed] = useState(false);
  const percentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));
  const remaining = Math.max(0, nextLevelXP - currentXP);
  const levelName = levelNames[(level - 1) % levelNames.length];
  const firstName = user?.name?.split(' ')[0];
  const greeting = firstName ? `Good to see you, ${firstName}.` : 'Welcome back.';
  const opportunities = [
    { title: 'Daily challenge', detail: 'Explore the existing challenge flow', icon: Target, status: 'Demo route', action: () => onNavigate('earn'), tone: 'blue' },
    { title: 'Watch & Earn', detail: 'Open the existing earning flow', icon: Video, status: 'Demo route', action: () => onNavigate('earn'), tone: 'violet' },
    { title: 'Refer & Earn', detail: 'Open the existing referral flow', icon: Users, status: 'Demo route', action: () => onNavigate('earn'), tone: 'green' },
    { title: 'Play & Earn', detail: 'Take on the skill challenge above', icon: Gamepad2, status: 'Play now', action: () => document.getElementById('game-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), tone: 'gold' },
    { title: 'Bonus missions', detail: 'New missions are being prepared', icon: Sparkles, status: 'Coming soon', tone: 'blue' },
    { title: `${streakDays}-day streak`, detail: 'Your current engagement streak', icon: Flame, status: 'In progress', action: () => onNavigate('activity'), tone: 'gold' },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.pageHeader}>
          <div><div className={styles.kicker}>VELOOP REWARDS <span>/</span> LEVEL JOURNEY</div><h1>{greeting}</h1><p>Your next milestone is within reach. Choose a way to keep moving.</p><span className={styles.demoDataNotice}><Sparkles size={12} /> Demo data · no account or wallet updates</span></div>
          <button className={styles.headerAction} onClick={() => onNavigate('activity')}><Clock3 size={16} /> Activity <ArrowUpRight size={15} /></button>
        </header>

        <section className={styles.hero} aria-labelledby="progress-title">
          <div className={styles.heroGlow} />
          <div className={styles.heroMain}>
            <div className={styles.badgeWrap}><PedestalBadge level={level} size={112} /><span className={styles.levelPill}><span className={styles.liveDot} /> CURRENT LEVEL</span></div>
            <div className={styles.heroCopy}>
              <div className={styles.heroLabel}>YOUR REWARDS JOURNEY <button className={styles.infoButton} title="XP helps you progress through VELOOP Rewards levels. Rewards depend on the platform's current configuration." aria-label="About level progress"><CircleHelp size={16} /></button></div>
              <h2 id="progress-title">Level {String(level).padStart(2, '0')} <span>{levelName}</span></h2>
              <div className={styles.xpTotal}>{currentXP.toLocaleString()} <span>XP</span></div>
              <div className={styles.progressMeta}><span>Progress to level {String(level + 1).padStart(2, '0')}</span><strong>{percentage}%</strong></div>
              <div className={styles.progressTrack} role="progressbar" aria-label="Level progress" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${percentage}%` }} /></div>
              <div className={styles.progressFoot}><span>{currentXP.toLocaleString()} XP earned</span><span>{nextLevelXP.toLocaleString()} XP goal</span></div>
              <div className={styles.nextCallout}><ArrowDownRight size={16} /><strong>{remaining.toLocaleString()} XP to go</strong><span>Level {String(level + 1).padStart(2, '0')}</span><button onClick={() => document.getElementById('earn-title')?.scrollIntoView({ behavior: 'smooth' })}>Find your next step <ArrowRight size={15} /></button></div>
            </div>
          </div>
          <div className={styles.heroFoot}><div><Zap size={16} /><span>XP earned today</span><strong>{todayXP} XP</strong></div><i /><div><Check size={16} /><span>Daily tasks</span><strong>{tasksDone} / {tasksTotal}</strong></div><i /><div><Flame size={16} /><span>Current streak</span><strong>{streakDays} days</strong></div></div>
        </section>

        <div className={styles.primaryGrid}>
          <section className={`${styles.card} ${styles.rewardCard}`} aria-labelledby="reward-title">
            <div className={styles.cardTop}><div><div className={styles.sectionEyebrow}>UP NEXT <span className={styles.rewardLock}><LockKeyhole size={13} /> LOCKED</span></div><h2 id="reward-title">A little closer to your next reward</h2></div><button className={styles.infoButton} title="This is a development placeholder. The official next-level reward configuration has not been connected." aria-label="About this reward"><CircleHelp size={17} /></button></div>
            <button className={`${styles.vault} ${rewardRevealed ? styles.revealed : ''}`} onClick={() => setRewardRevealed((value) => !value)} aria-expanded={rewardRevealed}>
              <div className={styles.vaultIcon}><Gift size={34} /></div><div className={styles.vaultText}><span>NEXT LEVEL REWARD · DEMO</span><strong>{rewardRevealed ? '500 VEs' : 'Reward vault'}</strong><small>{rewardRevealed ? 'Illustrative value only · not claimable' : 'Tap to preview the development reward'}</small></div><ChevronRight className={styles.vaultArrow} size={20} />
            </button>
            <div className={styles.rewardProgress}><div><span>Unlock at Level {String(level + 1).padStart(2, '0')}</span><strong>{remaining.toLocaleString()} XP remaining</strong></div><div className={styles.progressTrack}><span style={{ width: `${percentage}%` }} /></div><p>Illustrative reward data for development. Official reward rules and backend values are not connected.</p></div>
          </section>

          <section className={`${styles.card} ${styles.roadmapCard}`} aria-labelledby="roadmap-title">
            <div className={styles.cardTop}><div><div className={styles.sectionEyebrow}>YOUR NEXT MILESTONES</div><h2 id="roadmap-title">Level roadmap</h2></div><button className={styles.textLink} onClick={() => onNavigate('map')}>Full journey <ArrowRight size={14} /></button></div>
            <div className={styles.roadmap} role="list" aria-label="Level progression">
              {rewardSteps.map((item) => {
                const actualState = item.level < level ? 'completed' : item.level === level ? 'current' : item.level === level + 1 ? 'next' : 'locked';
                return <button key={item.level} className={`${styles.roadmapItem} ${styles[actualState]} ${selectedLevel === item.level ? styles.selected : ''}`} onClick={() => setSelectedLevel(item.level)} role="listitem" aria-pressed={selectedLevel === item.level}>
                  <span className={styles.roadIcon}>{actualState === 'completed' ? <Check size={15} /> : actualState === 'locked' ? <LockKeyhole size={14} /> : <span>{String(item.level).padStart(2, '0')}</span>}</span><span className={styles.roadLabel}>LEVEL {String(item.level).padStart(2, '0')}</span><span className={styles.roadReward}>{item.reward}</span>{actualState === 'current' && <span className={styles.youAreHere}>YOU ARE HERE</span>}{actualState === 'next' && <span className={styles.nextTag}>NEXT</span>}
                </button>;
              })}
            </div>
            <div className={styles.selectedInfo}><Award size={15} /><span>Level {String(selectedLevel).padStart(2, '0')} · {rewardSteps.find((step) => step.level === selectedLevel)?.reward || 'Milestone reward'}</span><span className={styles.demoTag}>DEMO</span></div>
          </section>
        </div>

        <div className={styles.lowerGrid}>
          <MiniGame />
          <section className={styles.card} aria-labelledby="activity-title">
            <div className={styles.cardTop}><div><div className={styles.sectionEyebrow}>YOUR MOMENTUM</div><h2 id="activity-title">Recent activity</h2></div><button className={styles.textLink} onClick={() => onNavigate('activity')}>View all <ArrowRight size={14} /></button></div>
            {activities?.length ? <div className={styles.activityList}>{activities.slice(0, 4).map((activity) => <div className={styles.activityRow} key={activity.id}><div className={styles.activityIcon}><Zap size={15} /></div><div className={styles.activityCopy}><strong>{activity.title}</strong><span>{activity.time}</span></div><span className={activity.isXP ? styles.activityXP : styles.activityReward}>{activity.amount}</span></div>)}</div> : <div className={styles.emptyState}><Sparkles size={22} /><strong>Your XP journey starts here</strong><span>Complete a challenge to see your progress.</span><button className={styles.textLink} onClick={() => onNavigate('earn')}>Start earning XP <ArrowRight size={14} /></button></div>}
          </section>
        </div>

        <section className={styles.earnSection} aria-labelledby="earn-title">
          <div className={styles.earnHeader}><div><div className={styles.sectionEyebrow}>SMALL STEPS, REAL MOMENTUM</div><h2 id="earn-title">Earn more XP & rewards</h2><p>Pick a path that fits your day.</p></div><div className={styles.remainingChip}><span>{remaining.toLocaleString()}</span> XP to next level</div></div>
          <div className={styles.opportunityGrid}>{opportunities.map(({ title, detail, icon: Icon, status, action, tone }) => <button key={title} className={styles.opportunity} onClick={action || undefined} disabled={!action} aria-label={`${title}: ${status}. ${action ? 'Open activity' : 'Coming soon'}`}><span className={`${styles.opportunityIcon} ${styles[tone]}`}><Icon size={18} /></span><span className={styles.opportunityText}><strong>{title}</strong><small>{detail}</small></span><span className={`${styles.opportunityStatus} ${status === 'Coming soon' ? styles.coming : ''}`}>{status}</span>{action && <ArrowRight className={styles.opportunityArrow} size={15} />}</button>)}</div>
        </section>

        <footer className={styles.footerNote}><span>Progress and activity values shown are development data.</span><button onClick={onPreviewLevelUp}><Sparkles size={14} /> Preview level-up celebration</button></footer>
      </main>
    </div>
  );
}

export default LevelUpDashboard;
