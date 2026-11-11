import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Info, Share2, RotateCcw, Home, Sparkles, Check, Copy } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { LaurelBadge } from '../../components/badges/LaurelBadge';

export const GamePage = ({ onBack }) => {
  const { level, currentXP, nextLevelXP, addXP, addVEs, recordActivity } = useDashboard();
  
  // Game states: 'playing' | 'completed'
  const [gameState, setGameState] = useState('playing');
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [vesCollected, setVesCollected] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [showShareToast, setShowShareToast] = useState(false);
  const [highScore, setHighScore] = useState(92);

  const canvasRef = useRef(null);
  const basketXRef = useRef(160); // Basket horizontal center
  const itemsRef = useRef([]);
  const popupsRef = useRef([]);
  const animationFrameId = useRef(null);

  // Initialize and run game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    setTimeLeft(20);
    setScore(0);
    setVesCollected(0);
    itemsRef.current = [];
    popupsRef.current = [];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    basketXRef.current = width / 2;

    const basketWidth = 74;
    const basketHeight = 24;
    const basketY = height - 42;

    let lastSpawn = Date.now();
    let isGameOver = false;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          isGameOver = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Touch / Mouse controls
    const handleMove = (clientX) => {
      const cRect = canvas.getBoundingClientRect();
      const relativeX = clientX - cRect.left;
      basketXRef.current = Math.max(basketWidth / 2, Math.min(width - basketWidth / 2, relativeX));
    };

    const onMouseMove = (e) => handleMove(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        basketXRef.current = Math.max(basketWidth / 2, basketXRef.current - 24);
      } else if (e.key === 'ArrowRight') {
        basketXRef.current = Math.min(width - basketWidth / 2, basketXRef.current + 24);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // Item types
    // 1. Purple XP Orb (value: 10 * 2 = 20)
    // 2. Gold V-Coin (value: 15, gives 1 VE)
    // 3. Green Cosmic Gem (value: 30)
    const spawnItem = () => {
      const rand = Math.random();
      let type = 'xp';
      if (rand > 0.65) type = 've';
      if (rand > 0.88) type = 'gem';

      itemsRef.current.push({
        id: Math.random(),
        x: Math.random() * (width - 40) + 20,
        y: -20,
        speed: 2.2 + Math.random() * 2.0,
        radius: type === 'gem' ? 14 : 15,
        type: type
      });
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background grid lines (subtle arcade effect)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Spawn items
      if (Date.now() - lastSpawn > 550 && !isGameOver) {
        spawnItem();
        lastSpawn = Date.now();
      }

      // Update & Draw Items
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const item = itemsRef.current[i];
        item.y += item.speed;

        // Check basket collision
        const bx = basketXRef.current;
        if (
          item.y + item.radius >= basketY &&
          item.y - item.radius <= basketY + basketHeight &&
          item.x >= bx - basketWidth / 2 - 8 &&
          item.x <= bx + basketWidth / 2 + 8
        ) {
          // Caught item!
          let pts = 10;
          let popupText = `+${pts * 2} XP`;
          let popupColor = '#F59E0B';

          if (item.type === 'xp') {
            pts = 10;
            popupText = '+20 XP';
            popupColor = '#A855F7';
          } else if (item.type === 've') {
            pts = 15;
            popupText = '+1 VE';
            popupColor = '#FBBF24';
            setVesCollected(v => v + 1);
          } else if (item.type === 'gem') {
            pts = 25;
            popupText = '+50 XP';
            popupColor = '#10B981';
          }

          setScore(s => s + pts);

          popupsRef.current.push({
            x: item.x,
            y: basketY - 10,
            text: popupText,
            color: popupColor,
            alpha: 1.0
          });

          itemsRef.current.splice(i, 1);
          continue;
        }

        // Draw item
        if (item.type === 'xp') {
          // Purple XP Orb
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#8B5CF6';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#DDD6FE';
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XP', item.x, item.y);
        } else if (item.type === 've') {
          // Gold V Coin
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#FEF08A';
          ctx.stroke();

          ctx.fillStyle = '#78350F';
          ctx.font = '900 11px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('V', item.x, item.y);
        } else {
          // Cosmic Green Gem
          ctx.beginPath();
          ctx.moveTo(item.x, item.y - item.radius);
          ctx.lineTo(item.x + item.radius, item.y);
          ctx.lineTo(item.x, item.y + item.radius);
          ctx.lineTo(item.x - item.radius, item.y);
          ctx.closePath();
          ctx.fillStyle = '#10B981';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#A7F3D0';
          ctx.stroke();
        }

        // Remove if off-screen
        if (item.y > height + 30) {
          itemsRef.current.splice(i, 1);
        }
      }

      // Draw Floating Score Popups
      for (let p = popupsRef.current.length - 1; p >= 0; p--) {
        const pop = popupsRef.current[p];
        pop.y -= 1.2;
        pop.alpha -= 0.025;

        if (pop.alpha <= 0) {
          popupsRef.current.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = pop.color;
        ctx.font = '800 12px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      // Draw Basket (Golden Mesh Catcher)
      const bx = basketXRef.current;
      ctx.save();
      // Outer glow
      ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
      ctx.shadowBlur = 14;

      // Basket body
      const gradient = ctx.createLinearGradient(bx - basketWidth / 2, basketY, bx + basketWidth / 2, basketY + basketHeight);
      gradient.addColorStop(0, '#FEF08A');
      gradient.addColorStop(0.5, '#F59E0B');
      gradient.addColorStop(1, '#B45309');

      ctx.beginPath();
      ctx.roundRect(bx - basketWidth / 2, basketY, basketWidth, basketHeight, [6, 6, 14, 14]);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFBEB';
      ctx.stroke();

      // Mesh lattice pattern on basket
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(120, 53, 15, 0.4)';
      ctx.lineWidth = 1.5;
      for (let lx = bx - basketWidth / 2 + 10; lx < bx + basketWidth / 2; lx += 10) {
        ctx.beginPath();
        ctx.moveTo(lx, basketY + 3);
        ctx.lineTo(lx, basketY + basketHeight - 4);
        ctx.stroke();
      }
      ctx.restore();

      if (!isGameOver) {
        animationFrameId.current = requestAnimationFrame(render);
      } else {
        // Game complete!
        setGameState('completed');
      }
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      clearInterval(timerInterval);
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [gameState]);

  // When game finishes, award XP and record activity
  useEffect(() => {
    if (gameState === 'completed') {
      const earnedXP = Math.max(30, Math.round(score * 0.4));
      const earnedVE = Math.max(5, vesCollected + 5);
      addXP(earnedXP);
      addVEs(earnedVE);
      recordActivity('XP Catcher Challenge', 'game', `+${earnedXP} XP`, 'gamepad-2', true);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [gameState]);

  // Handle Share functionality
  const handleShare = async () => {
    const shareText = `🎮 I just scored ${score} points in VeLoop XP Catcher! Level 05 Champion status unlocked! 🏆✨ Check it out!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VeLoop XP Catcher Score',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // SCREEN 3: CHALLENGE COMPLETE SCREEN
  if (gameState === 'completed') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
        {/* Top bar with Share */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
            RESULTS
          </span>

          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/25 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Center Trophy Crest */}
        <div className="my-auto py-4 flex flex-col items-center text-center">
          <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400 mb-1">
            OUTSTANDING!
          </span>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">
            CHALLENGE COMPLETE!
          </h2>

          <div className="my-5">
            <LaurelBadge level={level} size={145} subtitle="LEVEL 05" />
          </div>

          <div className="mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-medium">FINAL SCORE:</span>
              <span className="text-sm font-black text-amber-400">{score}</span>
              <span className="text-[10px] text-emerald-400 font-bold">(New Best!)</span>
            </div>
          </div>

          {/* Dual Reward Cards */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-5">
            <div 
              className="p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: '#151824', borderColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              <span className="text-xl font-black text-purple-400">
                +{Math.max(30, Math.round(score * 0.4))} XP
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                Experience
              </span>
            </div>

            <div 
              className="p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: '#151824', borderColor: 'rgba(245, 158, 11, 0.3)' }}
            >
              <span className="text-xl font-black text-amber-400">
                +{Math.max(5, vesCollected + 5)} VEs
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                Your Reward
              </span>
            </div>
          </div>

          {/* Mini Level Progress Bar */}
          <div className="w-full max-w-xs bg-[#151824] p-3 rounded-2xl border border-white/5 mb-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1.5">
              <span>Level 05</span>
              <span>Level 06</span>
            </div>
            <div className="w-full h-2.5 bg-[#0D0F18] rounded-full p-[1.5px] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ width: `${Math.min(100, Math.round((currentXP / nextLevelXP) * 100))}%` }}
              />
            </div>
            <div className="text-right text-[10px] text-slate-400 font-medium mt-1">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => setGameState('playing')}
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)'
            }}
          >
            <RotateCcw className="w-4 h-4 text-slate-950" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Share notification toast */}
        {showShareToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl z-50">
            <Check className="w-4 h-4" />
            <span>Score copied to clipboard! Share anywhere!</span>
          </div>
        )}
      </div>
    );
  }

  // SCREEN 2: ACTIVE GAMEPLAY
  return (
    <div className="flex-1 flex flex-col justify-between p-4 text-white select-none relative overflow-hidden" style={{ background: '#0D0E15' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 z-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-amber-400">
          <span>XP CATCHER</span>
          <Info className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Countdown Timer */}
        <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 font-mono text-sm font-extrabold text-amber-400">
          {formatTimer(timeLeft)}
        </div>
      </div>

      {/* Main Game Canvas Container */}
      <div className="flex-1 my-3 rounded-3xl border border-white/10 bg-[#090A10] relative overflow-hidden flex flex-col">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-ew-resize touch-none"
          style={{ touchAction: 'none' }}
        />
        
        {/* Touch drag guide on mobile */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5 text-[10px] text-slate-400 pointer-events-none">
          Drag basket or use arrow keys ← →
        </div>
      </div>

      {/* Bottom HUD */}
      <div 
        className="p-3 rounded-2xl border flex items-center justify-between z-10"
        style={{
          backgroundColor: '#151824',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            YOUR SCORE
          </span>
          <span className="text-xl font-black text-amber-400 font-display">
            {score}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* +VEs badge */}
          <div className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
            <span>🪙</span>
            <span>+{vesCollected} VEs</span>
          </div>

          {/* 2X Multiplier badge */}
          <div className="px-2.5 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-black text-xs">
            {multiplier}X Multiplier
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
