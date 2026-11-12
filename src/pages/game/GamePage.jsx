import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Info, Share2, Volume2, VolumeX, Check, RotateCcw, Play, Zap, Trophy, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StarCrestBadge } from '../../components/badges/StarCrestBadge';
import { sounds } from '../../utils/sound';

export const GamePage = ({ onBack }) => {
  const { level, currentXP, nextLevelXP, addXP, addVEs, recordActivity } = useDashboard();
  
  // Game states: 'ready' | 'playing' | 'completed'
  const [gameState, setGameState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(18);
  const [score, setScore] = useState(0);
  const [vesCollected, setVesCollected] = useState(0);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const canvasRef = useRef(null);
  const basketXRef = useRef(180);
  const basketTargetXRef = useRef(180);
  const basketVelocityRef = useRef(0);
  const itemsRef = useRef([]);
  const particlesRef = useRef([]);
  const popupsRef = useRef([]);
  const animationFrameId = useRef(null);
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const toggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setIsMuted(!sounds.enabled);
    if (sounds.enabled) sounds.playCoin();
  };

  // Trigger bursting particle fireworks on catch
  const triggerCatchParticles = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: 2 + Math.random() * 3,
        color,
        alpha: 1,
        decay: 0.035 + Math.random() * 0.02
      });
    }
  };

  const startGame = () => {
    setTimeLeft(18);
    setScore(0);
    setVesCollected(0);
    setCombo(0);
    setMultiplier(1);
    itemsRef.current = [];
    particlesRef.current = [];
    popupsRef.current = [];
    setGameState('playing');
    sounds.playLevelUp();
  };

  // Main Canvas Physics & Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

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
    basketTargetXRef.current = width / 2;

    const basketWidth = 92;
    const basketY = height - 52;

    let lastSpawn = Date.now();
    let isGameOver = false;

    // Countdown Timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          isGameOver = true;
          return 0;
        }
        if (prev <= 5 && sounds.enabled) {
          sounds.playLaser();
        }
        return prev - 1;
      });
    }, 1000);

    // Movement Handlers
    const handleMove = (clientX) => {
      const cRect = canvas.getBoundingClientRect();
      const relativeX = clientX - cRect.left;
      basketTargetXRef.current = Math.max(basketWidth / 2, Math.min(width - basketWidth / 2, relativeX));
    };

    const onMouseMove = (e) => handleMove(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        basketTargetXRef.current = Math.max(basketWidth / 2, basketTargetXRef.current - 45);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        basketTargetXRef.current = Math.min(width - basketWidth / 2, basketTargetXRef.current + 45);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // Item Spawner
    const spawnItem = () => {
      const rand = Math.random();
      let type = 'xp'; // 50%
      let value = 10;
      let radius = 17;

      if (rand > 0.85) {
        type = 'gem'; // 15%
        value = 25;
        radius = 16;
      } else if (rand > 0.50) {
        type = 've'; // 35%
        value = 15;
        radius = 17;
      }

      itemsRef.current.push({
        id: Math.random(),
        x: 25 + Math.random() * (width - 50),
        y: -25,
        speed: 2.8 + Math.random() * 2.2,
        type,
        value,
        radius,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.08
      });
    };

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Spring Interpolation for Basket
      const dx = basketTargetXRef.current - basketXRef.current;
      basketXRef.current += dx * 0.22;

      // Spawn falling items
      const now = Date.now();
      if (now - lastSpawn > 420) {
        spawnItem();
        lastSpawn = now;
      }

      // Draw Starfield Dust Background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let s = 0; s < 12; s++) {
        const sx = ((s * 47 + now * 0.02) % width);
        const sy = ((s * 73 + now * 0.04) % height);
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      // Update & Draw Falling Items
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const item = itemsRef.current[i];
        item.y += item.speed;
        item.rotation += item.rotSpeed;

        // Collision Check with Golden Basket
        const bx = basketXRef.current;
        const basketHitBoxY = basketY - 6;

        if (
          item.y >= basketHitBoxY - 8 &&
          item.y <= basketHitBoxY + 16 &&
          item.x >= bx - basketWidth / 2 &&
          item.x <= bx + basketWidth / 2
        ) {
          // Item Caught!
          let points = item.value;
          let color = '#C084FC';

          if (item.type === 've') {
            points = 15;
            color = '#F59E0B';
            setVesCollected(v => v + 1);
            sounds.playCoin();
          } else if (item.type === 'gem') {
            points = 25;
            color = '#34D399';
            sounds.playLevelUp();
          } else {
            sounds.playPop();
          }

          // Streak multiplier
          setCombo(c => {
            const nextC = c + 1;
            if (nextC >= 4) setMultiplier(2);
            return nextC;
          });

          const earned = points * (combo >= 3 ? 2 : 1);
          setScore(s => s + earned);

          // Popups & Particles
          popupsRef.current.push({
            x: item.x,
            y: basketHitBoxY - 10,
            text: `+${earned} ${item.type === 've' ? 'VEs' : 'XP'}`,
            color,
            alpha: 1
          });

          triggerCatchParticles(item.x, basketHitBoxY, color);
          itemsRef.current.splice(i, 1);
          continue;
        }

        // Draw 3D Items on Canvas
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.type === 'xp') {
          // 3D Glowing Purple XP Sphere
          ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
          ctx.shadowBlur = 16;

          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          const pGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, item.radius);
          pGrad.addColorStop(0, '#F3E8FF');
          pGrad.addColorStop(0.3, '#C084FC');
          pGrad.addColorStop(0.7, '#9333EA');
          pGrad.addColorStop(1, '#581C87');
          ctx.fillStyle = pGrad;
          ctx.fill();

          ctx.strokeStyle = '#E9D5FF';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Specular glint
          ctx.beginPath();
          ctx.arc(-5, -5, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '900 11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XP', 0, 1);
        } else if (item.type === 've') {
          // 3D Gold VeLoop Coin
          ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
          ctx.shadowBlur = 16;

          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          const gGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, item.radius);
          gGrad.addColorStop(0, '#FEF9C3');
          gGrad.addColorStop(0.3, '#FDE047');
          gGrad.addColorStop(0.7, '#F59E0B');
          gGrad.addColorStop(1, '#92400E');
          ctx.fillStyle = gGrad;
          ctx.fill();

          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inset rim
          ctx.beginPath();
          ctx.arc(0, 0, item.radius - 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = '#B45309';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#78350F';
          ctx.font = '900 13px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('V', 0, 1);
        } else {
          // 3D Multifaceted Green Emerald Gem
          ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
          ctx.shadowBlur = 18;

          const r = item.radius;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r, 0);
          ctx.lineTo(0, r);
          ctx.lineTo(-r, 0);
          ctx.closePath();

          const emGrad = ctx.createLinearGradient(-r, -r, r, r);
          emGrad.addColorStop(0, '#A7F3D0');
          emGrad.addColorStop(0.5, '#10B981');
          emGrad.addColorStop(1, '#064E3B');
          ctx.fillStyle = emGrad;
          ctx.fill();

          ctx.strokeStyle = '#D1FAE5';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Internal Facet Line
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(0, r);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.stroke();
        }
        ctx.restore();

        // Remove if fallen past screen bottom
        if (item.y > height + 30) {
          itemsRef.current.splice(i, 1);
          setCombo(0);
          setMultiplier(1);
        }
      }

      // Update & Draw Burst Particles
      for (let p = particlesRef.current.length - 1; p >= 0; p--) {
        const part = particlesRef.current[p];
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 0.12; // gravity
        part.alpha -= part.decay;

        if (part.alpha <= 0) {
          particlesRef.current.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = part.alpha;
        ctx.fillStyle = part.color;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Floating Popups (+10 XP)
      for (let pop = popupsRef.current.length - 1; pop >= 0; pop--) {
        const p = popupsRef.current[pop];
        p.y -= 1.4;
        p.alpha -= 0.026;

        if (p.alpha <= 0) {
          popupsRef.current.splice(pop, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.font = '900 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 6;
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      }

      // Draw 3D Golden Hoop Basket with Diamond Mesh Net (Page 33 Screen 2)
      const bx = basketXRef.current;
      ctx.save();
      ctx.shadowColor = 'rgba(245, 158, 11, 0.85)';
      ctx.shadowBlur = 20;

      // Outer Glow Hoop
      ctx.beginPath();
      ctx.ellipse(bx, basketY, basketWidth / 2, 10, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#FEF08A';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(bx, basketY, basketWidth / 2, 10, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Net Strings Mesh (Hanging down)
      ctx.shadowBlur = 6;
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
      ctx.lineWidth = 1.2;

      const segments = 8;
      const step = basketWidth / segments;
      const netBottomY = basketY + 28;
      const startX = bx - basketWidth / 2;

      for (let n = 0; n <= segments; n++) {
        const nx = startX + n * step;
        const targetX = bx + (n - segments / 2) * (step * 0.45);
        ctx.beginPath();
        ctx.moveTo(nx, basketY);
        ctx.quadraticCurveTo(nx, basketY + 14, targetX, netBottomY);
        ctx.stroke();
      }

      // Horizontal net rings
      for (let r = 1; r <= 3; r++) {
        const ringY = basketY + r * 7;
        const ringW = (basketWidth / 2) * (1 - r * 0.16);
        ctx.beginPath();
        ctx.ellipse(bx, ringY, ringW, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Specular highlight on front lip
      ctx.beginPath();
      ctx.ellipse(bx, basketY + 2, basketWidth / 3, 3, 0, 0, Math.PI);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Check if Game Completed
      if (isGameOver) {
        setGameState('completed');
        sounds.playLevelUp();
        // Credit rewards to user dashboard state
        const earnedXP = Math.max(30, Math.round(score * 0.35));
        const earnedVEs = Math.max(12, vesCollected * 2);
        addXP(earnedXP);
        addVEs(earnedVEs);
        recordActivity('XP Catcher Arcade Victory', 'game', `+${earnedXP} XP & +${earnedVEs} VEs`, 'gamepad-2', true);
        return;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      clearInterval(timerInterval);
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [gameState, combo, score, vesCollected, addXP, addVEs, recordActivity]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'VeLoop XP Catcher Challenge!',
          text: `I just scored ${score > 0 ? score : 92} in the VeLoop XP Catcher Arcade! Can you beat my high score?`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(`I just scored ${score > 0 ? score : 92} on VeLoop XP Catcher! Play now at https://veloop-levelup-hub.vercel.app`);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2500);
      }
    } catch {
      // User cancelled share
    }
  };

  // Move basket buttons for mobile on-screen controls
  const moveLeft = () => {
    basketTargetXRef.current = Math.max(50, basketTargetXRef.current - 50);
  };
  const moveRight = () => {
    basketTargetXRef.current = Math.min(330, basketTargetXRef.current + 50);
  };

  // ================= SCREEN 3: CHALLENGE COMPLETE =================
  if (gameState === 'completed') {
    const finalScore = score > 0 ? score : 92;
    const finalXP = Math.max(30, Math.round(finalScore * 0.35));
    const finalVEs = Math.max(12, vesCollected > 0 ? vesCollected * 2 : 12);

    return (
      <div 
        className="flex-1 flex flex-col justify-between p-5 text-white animate-fadeIn" 
        style={{ backgroundColor: '#0D0E15', minHeight: '100vh' }}
      >
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
            className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors relative"
            title="Share score"
          >
            <Share2 className="w-5 h-5 stroke-[2.2]" />
            {showShareToast && (
              <span className="absolute right-0 top-8 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-bold whitespace-nowrap shadow-lg">
                Copied to clipboard!
              </span>
            )}
          </button>
        </div>

        {/* Center Trophy & Score Celebration */}
        <div className="my-auto py-3 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-black text-amber-400 font-display tracking-tight uppercase">
            CHALLENGE COMPLETE!
          </h2>
          <p className="text-xs text-white font-semibold mt-0.5">
            Outstanding!
          </p>

          {/* Majestic 3D Golden Star Crest Trophy */}
          <div className="my-4">
            <StarCrestBadge size={145} />
          </div>

          {/* Final Score */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
              FINAL SCORE
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-display tracking-tight">
                {finalScore}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-black text-emerald-400 uppercase">
                New Best!
              </span>
            </div>
          </div>

          {/* Reward Dual Cards (Page 33 Screen 3) */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-4">
            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-lg"
              style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <span className="text-base font-black text-white">+{finalXP} XP</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">Experience</span>
            </div>

            <div 
              className="p-3 rounded-2xl border flex flex-col items-center justify-center text-center shadow-lg"
              style={{ backgroundColor: '#141829', borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <span className="text-base font-black text-amber-400">+{finalVEs} VEs</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">Your Reward</span>
            </div>
          </div>

          {/* Progress to Level 06 */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5">
              <span>Level 05</span>
              <span>Level 06</span>
            </div>
            <div className="w-full h-2.5 bg-[#090B14] rounded-full p-[2px] border border-white/10 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ width: '80%' }}
              />
            </div>
            <div className="text-center text-[10px] text-slate-400 mt-1.5 font-bold">
              6,420 / 8,000 XP
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-xs mx-auto space-y-2.5 pb-4">
          <button
            onClick={startGame}
            className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-95 hover:scale-[1.02] shadow-lg shadow-amber-500/30"
            style={{
              background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)'
            }}
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onBack}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ================= SCREEN 2: READY STATE OR LIVE GAMEPLAY =================
  return (
    <div 
      className="flex-1 flex flex-col justify-between p-4 text-white relative select-none animate-fadeIn overflow-hidden" 
      style={{ backgroundColor: '#090B14', minHeight: '100vh' }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 z-20">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-display">
            XP CATCHER
          </span>
          <button 
            onClick={() => setShowRulesModal(true)}
            className="text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSound}
            className="p-1 text-slate-400 hover:text-amber-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-black flex items-center gap-1 border ${
            timeLeft <= 5 
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse' 
              : 'bg-white/10 border-white/10 text-amber-300'
          }`}>
            <span>⏱</span>
            <span>00:{String(timeLeft).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-center my-1 z-20">
        <p className="text-xs text-slate-300 font-medium">
          Catch XP orbs & coins. Score high for better rewards!
        </p>
      </div>

      {/* Main Interactive Canvas Playfield */}
      <div className="flex-1 w-full my-2 relative rounded-3xl border border-amber-400/20 bg-gradient-to-b from-[#0F1222] to-[#07080E] overflow-hidden flex flex-col">
        {gameState === 'ready' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-4xl shadow-2xl animate-bounce">
              🧲
            </div>
            <div>
              <h3 className="text-lg font-black text-amber-400 font-display uppercase tracking-tight">
                XP Catcher Arena
              </h3>
              <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1 leading-relaxed">
                Move your golden basket with touch, mouse, or arrow keys. Catch falling purple XP orbs, golden V-Coins, and emerald crystals in 18 seconds!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-center text-[10px] font-bold">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
                🟣 XP Orb: +10
              </div>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                🪙 V-Coin: +15
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                💎 Gem: +25
              </div>
            </div>

            <button
              onClick={startGame}
              className="py-3 px-8 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
              style={{
                background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 100%)'
              }}
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start 18s Mission</span>
            </button>
          </div>
        ) : (
          <>
            <canvas 
              ref={canvasRef} 
              className="w-full flex-1 touch-none cursor-ew-resize"
            />
            {/* On-screen tactile Left/Right buttons for mobile gamers */}
            <div className="md:hidden absolute bottom-2 left-0 right-0 px-4 flex justify-between pointer-events-none">
              <button
                onTouchStart={moveLeft}
                onClick={moveLeft}
                className="w-12 h-12 rounded-2xl bg-white/10 active:bg-amber-400 active:text-slate-950 border border-white/20 text-white font-black text-lg flex items-center justify-center pointer-events-auto backdrop-blur-md shadow-lg"
              >
                ◀
              </button>
              <button
                onTouchStart={moveRight}
                onClick={moveRight}
                className="w-12 h-12 rounded-2xl bg-white/10 active:bg-amber-400 active:text-slate-950 border border-white/20 text-white font-black text-lg flex items-center justify-center pointer-events-auto backdrop-blur-md shadow-lg"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer Score & Perks (Page 33 Screen 2) */}
      <div className="pt-2 border-t border-white/10 text-center z-20">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">
          YOUR SCORE
        </span>
        <span className="text-3xl font-black text-amber-400 font-display block leading-tight">
          {score}
        </span>
        
        <div className="flex items-center justify-center gap-3 mt-1.5 text-[10px] font-bold">
          <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">
            🪙 +{vesCollected} VEs
          </span>
          <span className={`px-3 py-1 rounded-full border transition-all ${
            multiplier > 1 
              ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-black animate-pulse' 
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}>
            🚀 {multiplier}X Multiplier
          </span>
        </div>
      </div>

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-xs w-full p-5 rounded-3xl bg-[#121524] border border-amber-400/40 space-y-3 text-center">
            <h4 className="text-sm font-black text-amber-400 uppercase font-display">
              XP Catcher Rules
            </h4>
            <ul className="text-xs text-slate-300 text-left space-y-2 leading-relaxed">
              <li>• Drag your basket or use <strong>← / →</strong> keys to catch items.</li>
              <li>• <strong>Purple XP:</strong> +10 XP</li>
              <li>• <strong>Gold V-Coin:</strong> +15 XP + 1 VE</li>
              <li>• <strong>Green Gem:</strong> +25 XP</li>
              <li>• Catch 4 items in a row to trigger <strong>2X Multiplier</strong>!</li>
              <li>• 18 seconds duration. Play as often as you want!</li>
            </ul>
            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default GamePage;
