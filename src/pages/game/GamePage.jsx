import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Info, Share2, RotateCcw, Home, Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StarCrestBadge } from '../../components/badges/StarCrestBadge';

export const GamePage = ({ onBack }) => {
  const { level, currentXP, nextLevelXP, addXP, addVEs, recordActivity } = useDashboard();
  
  // 'playing' | 'completed'
  const [gameState, setGameState] = useState('playing');
  const [timeLeft, setTimeLeft] = useState(18);
  const [score, setScore] = useState(120);
  const [vesCollected, setVesCollected] = useState(5);
  const [multiplier, setMultiplier] = useState(2);
  const [showShareToast, setShowShareToast] = useState(false);

  const canvasRef = useRef(null);
  const basketXRef = useRef(180);
  const itemsRef = useRef([]);
  const popupsRef = useRef([]);
  const animationFrameId = useRef(null);

  // Initialize and run game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    setTimeLeft(18);
    setScore(0);
    setVesCollected(0);
    itemsRef.current = [];
    popupsRef.current = [];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    basketXRef.current = width / 2;

    const basketWidth = 84;
    const basketHeight = 36;
    const basketY = height - 52;

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
        basketXRef.current = Math.max(basketWidth / 2, basketXRef.current - 28);
      } else if (e.key === 'ArrowRight') {
        basketXRef.current = Math.min(width - basketWidth / 2, basketXRef.current + 28);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // Spawn falling items
    const spawnItem = () => {
      const rand = Math.random();
      let type = 'xp';
      if (rand > 0.6) type = 've';
      if (rand > 0.85) type = 'gem';

      itemsRef.current.push({
        id: Math.random(),
        x: Math.random() * (width - 60) + 30,
        y: -25,
        speed: 2.4 + Math.random() * 2.2,
        radius: type === 'gem' ? 14 : 16,
        type: type,
        angle: Math.random() * Math.PI
      });
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cosmic background vertical neon rays
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#090B14');
      grad.addColorStop(0.5, '#0E1325');
      grad.addColorStop(1, '#080A12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Vertical neon ambient glow columns
      const cols = [width * 0.25, width * 0.5, width * 0.75];
      cols.forEach(cx => {
        const rayGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
        rayGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
        rayGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
        rayGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = rayGrad;
        ctx.fillRect(cx - 25, 0, 50, height);
      });

      // Spawn items
      if (Date.now() - lastSpawn > 500 && !isGameOver) {
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
          item.x >= bx - basketWidth / 2 - 10 &&
          item.x <= bx + basketWidth / 2 + 10
        ) {
          let pts = 10;
          let popupText = '+10 XP';
          let popupColor = '#FBBF24';

          if (item.type === 'xp') {
            pts = 10;
            popupText = '+10 XP';
            popupColor = '#C084FC';
          } else if (item.type === 've') {
            pts = 15;
            popupText = '+1 VE';
            popupColor = '#F59E0B';
            setVesCollected(v => v + 1);
          } else if (item.type === 'gem') {
            pts = 30;
            popupText = '+30 XP';
            popupColor = '#34D399';
          }

          setScore(s => s + pts);

          popupsRef.current.push({
            x: item.x,
            y: basketY - 12,
            text: popupText,
            color: popupColor,
            alpha: 1.0
          });

          itemsRef.current.splice(i, 1);
          continue;
        }

        // Draw item
        ctx.save();
        if (item.type === 'xp') {
          // Glowing Purple XP Orb with ring
          ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
          ctx.shadowBlur = 12;

          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          const pGrad = ctx.createRadialGradient(item.x - 4, item.y - 4, 2, item.x, item.y, item.radius);
          pGrad.addColorStop(0, '#E9D5FF');
          pGrad.addColorStop(0.4, '#A855F7');
          pGrad.addColorStop(1, '#6B21A8');
          ctx.fillStyle = pGrad;
          ctx.fill();

          ctx.strokeStyle = '#DDD6FE';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '900 11px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XP', item.x, item.y);
        } else if (item.type === 've') {
          // Glowing Gold V Coin
          ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
          ctx.shadowBlur = 12;

          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          const gGrad = ctx.createRadialGradient(item.x - 4, item.y - 4, 2, item.x, item.y, item.radius);
          gGrad.addColorStop(0, '#FEF9C3');
          gGrad.addColorStop(0.5, '#F59E0B');
          gGrad.addColorStop(1, '#B45309');
          ctx.fillStyle = gGrad;
          ctx.fill();

          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#78350F';
          ctx.font = '900 12px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('V', item.x, item.y);
        } else {
          // Glowing Emerald Octahedron Gem
          ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
          ctx.shadowBlur = 14;

          const r = item.radius;
          ctx.beginPath();
          ctx.moveTo(item.x, item.y - r);
          ctx.lineTo(item.x + r, item.y);
          ctx.lineTo(item.x, item.y + r);
          ctx.lineTo(item.x - r, item.y);
          ctx.closePath();
          ctx.fillStyle = '#10B981';
          ctx.fill();

          ctx.strokeStyle = '#A7F3D0';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Gem inner facet
          ctx.beginPath();
          ctx.moveTo(item.x, item.y - r);
          ctx.lineTo(item.x, item.y + r);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.stroke();
        }
        ctx.restore();

        if (item.y > height + 30) {
          itemsRef.current.splice(i, 1);
        }
      }

      // Draw Floating Score Popups
      for (let p = popupsRef.current.length - 1; p >= 0; p--) {
        const pop = popupsRef.current[p];
        pop.y -= 1.3;
        pop.alpha -= 0.028;

        if (pop.alpha <= 0) {
          popupsRef.current.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = pop.color;
        ctx.font = '900 13px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      // Draw Golden Hoop Basket with Diamond Mesh Net (from Screen 2)
      const bx = basketXRef.current;
      ctx.save();

      // Golden Hoop Rim
      ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.ellipse(bx, basketY, basketWidth / 2, 9, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFBEB';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(bx, basketY, basketWidth / 2, 9, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Mesh Net Hanging Down
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
      ctx.lineWidth = 1.3;

      const netBottomY = basketY + basketHeight;
      const netBottomWidth = basketWidth * 0.45;

      // Downward angled net strands (cross-hatch)
      const numLines = 8;
      for (let k = 0; k <= numLines; k++) {
        const topX = (bx - basketWidth / 2) + (basketWidth / numLines) * k;
        const botX = (bx - netBottomWidth / 2) + (netBottomWidth / numLines) * (numLines - k);
        ctx.beginPath();
        ctx.moveTo(topX, basketY);
        ctx.lineTo(botX, netBottomY);
        ctx.stroke();

        const botX2 = (bx - netBottomWidth / 2) + (netBottomWidth / numLines) * k;
        ctx.beginPath();
        ctx.moveTo(topX, basketY);
        ctx.lineTo(botX2, netBottomY);
        ctx.stroke();
      }

      // Bottom golden ring of net
      ctx.beginPath();
      ctx.ellipse(bx, netBottomY, netBottomWidth / 2, 4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();

      if (!isGameOver) {
        animationFrameId.current = requestAnimationFrame(render);
      } else {
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

  useEffect(() => {
    if (gameState === 'completed') {
      const earnedXP = 30;
      const earnedVE = 12;
      addXP(earnedXP);
      addVEs(earnedVE);
      recordActivity('XP Catcher Reward', 've', '+10 VEs', 'coins', false);
    }
  }, [gameState]);

  const handleShare = async () => {
    const text = `🏆 I scored ${score || 92} in VeLoop XP Catcher! Level 05 Champion status unlocked! 🎮✨`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'VeLoop Rewards', text, url: window.location.href });
      } catch (err) {
        copyText(text);
      }
    } else {
      copyText(text);
    }
  };

  const copyText = (t) => {
    navigator.clipboard.writeText(t);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const formatTimer = (secs) => {
    const s = String(secs).padStart(2, '0');
    return `00:${s}`;
  };

  // SCREEN 3: CHALLENGE COMPLETE
  if (gameState === 'completed') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 text-white animate-fadeIn" style={{ background: '#0D0E15' }}>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors"
          >
            <Share2 className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Center: Star Crest Badge & Final Score */}
        <div className="my-auto py-2 flex flex-col items-center text-center">
          <h2 className="text-xl font-black text-amber-400 font-display tracking-tight uppercase">
            CHALLENGE COMPLETE!
          </h2>
          <p className="text-xs text-white font-semibold mt-0.5">
            Outstanding!
          </p>

          {/* 3D Star Crest on Pedestal with Confetti */}
          <div className="my-3">
            <StarCrestBadge size={140} />
          </div>

          {/* FINAL SCORE */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
              FINAL SCORE
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-4xl font-black text-amber-400 font-display tracking-tight">
                {score > 0 ? score : 92}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-black text-emerald-400">
                New Best!
              </span>
            </div>
          </div>

          {/* Dual Reward Cards */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-4">
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: '#121524', borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <span className="text-base font-black text-white">+30 XP</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">Experience</span>
            </div>

            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: '#121524', borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <span className="text-base font-black text-amber-400">+12 VEs</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">Your Reward</span>
            </div>
          </div>

          {/* Progress Bar: Level 05 -> Level 06 */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
              <span>Level 05</span>
              <span>Level 06</span>
            </div>
            <div className="w-full h-2.5 bg-[#090B14] rounded-full p-[1.5px] border border-white/5 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ width: `${Math.min(100, Math.round((currentXP / nextLevelXP) * 100))}%` }}
              />
            </div>
            <div className="text-center text-[10px] text-slate-400 font-bold mt-1">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2 max-w-xs mx-auto w-full">
          <button
            onClick={() => setGameState('playing')}
            className="w-full py-3.5 px-4 rounded-full font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
            }}
          >
            Play Again
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 px-4 rounded-full font-bold text-xs text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
        </div>

        {showShareToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xl z-50">
            <Check className="w-4 h-4" />
            <span>Score copied to clipboard!</span>
          </div>
        )}
      </div>
    );
  }

  // SCREEN 2: ACTIVE XP CATCHER GAMEPLAY
  return (
    <div className="flex-1 flex flex-col justify-between p-4 text-white select-none relative overflow-hidden" style={{ background: '#0D0E15' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 z-10">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs font-black tracking-wider uppercase text-white font-display">
              XP CATCHER
            </span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Catch XP orbs & coins. Score high for better rewards!
          </p>
        </div>

        {/* Countdown Timer (e.g. 00:18) */}
        <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs font-bold text-amber-400 flex items-center gap-1">
          <span className="text-[10px]">⏱</span>
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Main Game Canvas */}
      <div className="flex-1 my-2 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col bg-[#080911]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-ew-resize touch-none"
          style={{ touchAction: 'none' }}
        />
        
        {/* Floating +10 XP prompt illustration */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white/5 text-[9px] text-slate-400 pointer-events-none">
          Drag hoop or use arrow keys ← →
        </div>
      </div>

      {/* Bottom HUD */}
      <div 
        className="p-3 rounded-2xl border flex items-center justify-between z-10"
        style={{
          backgroundColor: '#121524',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
            YOUR SCORE
          </span>
          <span className="text-2xl font-black text-amber-400 font-display leading-none">
            {score}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* +5 VEs pill */}
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1">
            <span>🪙</span>
            <span>+{vesCollected} VEs</span>
          </div>

          {/* 🚀 2X Multiplier pill */}
          <div className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-400 flex items-center gap-1">
            <span>🚀</span>
            <span>{multiplier}X Multiplier</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
