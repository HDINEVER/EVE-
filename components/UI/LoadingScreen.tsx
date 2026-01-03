import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// 加载状态消息
const loadingMessages = [
  { threshold: 0, text: 'Establishing secure connection...' },
  { threshold: 10, text: 'Loading ship geometry data...' },
  { threshold: 30, text: 'Processing hull materials...' },
  { threshold: 50, text: 'Applying faction textures...' },
  { threshold: 70, text: 'Compiling render shaders...' },
  { threshold: 85, text: 'Initializing holographic display...' },
  { threshold: 95, text: 'Systems coming online...' },
];

// Hexagonal grid pattern for background
const HexGrid: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <polygon 
            points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4" 
            fill="none" 
            stroke="rgba(34,211,238,0.5)" 
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
);

// Floating particles effect
const FloatingParticles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20],
          x: [-10, 10],
          opacity: [0.2, 0.6, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const LoadingScreen: React.FC = () => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fakeProgress, setFakeProgress] = useState(0);
  const lastRealProgress = useRef(0);
  const stuckTime = useRef(0);

  // 平滑插值 + 假进度逻辑
  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        // 检测是否卡住了（实际进度没变化）
        if (progress === lastRealProgress.current) {
          stuckTime.current += 50;
        } else {
          stuckTime.current = 0;
          lastRealProgress.current = progress;
        }

        // 计算目标进度
        let targetProgress = progress;

        // 如果卡住超过 500ms，开始添加假进度
        if (stuckTime.current > 500 && progress < 95) {
          // 假进度缓慢增加，但不会超过实际进度太多
          const fakeBonus = Math.min(
            (stuckTime.current - 500) * 0.002, // 每秒增加约4%的假进度
            Math.min(15, 95 - progress) // 最多比实际进度多15%，且不超过95%
          );
          setFakeProgress(fakeBonus);
          targetProgress = Math.min(progress + fakeBonus, 95);
        } else {
          setFakeProgress(0);
        }

        // 平滑插值到目标进度
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.1) return targetProgress;
        
        // 进度增加时快一点，减少时慢一点（通常不会减少）
        const speed = diff > 0 ? 0.08 : 0.02;
        return prev + diff * speed;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress, active]);

  // 获取当前状态消息
  const currentMessage = [...loadingMessages]
    .reverse()
    .find(m => displayProgress >= m.threshold)?.text || loadingMessages[0].text;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Effects */}
          <HexGrid />
          <FloatingParticles />
          
          {/* Animated Background Glow */}
          <motion.div 
            className="absolute w-[80vw] h-[80vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(34,211,238,0.02) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Secondary Glow */}
          <motion.div 
            className="absolute w-[60vw] h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
            animate={{ 
              scale: [1.1, 0.9, 1.1],
              x: [50, -50, 50],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main Loading Ring */}
          <div className="relative w-48 h-48 mb-8">
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Background ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Outer decorative ring */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(34,211,238,0.1)"
                strokeWidth="0.5"
              />
              
              {/* Main track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
              />
              
              {/* Progress ring with glow */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (displayProgress / 100) * 283}
                style={{ 
                  transition: 'stroke-dashoffset 0.15s ease-out',
                  filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.6))',
                }}
              />
              
              {/* Inner rotating ring */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(34,211,238,0.15)"
                  strokeWidth="1"
                  strokeDasharray="8 16"
                />
              </motion.g>
              
              {/* Outer rotating ring (opposite direction) */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="rgba(34,211,238,0.1)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
              </motion.g>
              
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Glass effect background */}
              <div 
                className="absolute w-24 h-24 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34,211,238,0.2)',
                }}
              />
              
              <motion.span 
                className="relative text-4xl font-bold text-cyan-400 font-mono"
                style={{
                  textShadow: '0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(displayProgress)}
                <span className="text-lg text-cyan-600">%</span>
              </motion.span>
            </div>

            {/* Orbiting dots */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                  background: 'radial-gradient(circle, #22d3ee, #0891b2)',
                  boxShadow: '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)',
                }}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-76px',
                    left: '50%',
                    marginLeft: '-4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === 0 ? '#22d3ee' : 'rgba(34,211,238,0.5)',
                    boxShadow: i === 0 ? '0 0 15px rgba(34,211,238,1)' : '0 0 8px rgba(34,211,238,0.5)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Loading text */}
          <div className="text-center relative z-10">
            {/* Faction Badge */}
            <motion.div 
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-[10px] text-cyan-600 uppercase tracking-[0.4em] font-mono">EMPIRE SYSTEM</span>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
            </motion.div>
            
            <h2 
              className="text-xl font-bold tracking-[0.3em] uppercase mb-3 font-['Share_Tech_Mono']"
              style={{
                color: '#e2e8f0',
                textShadow: '0 0 30px rgba(34,211,238,0.4)',
              }}
            >
              INITIALIZING SYSTEMS
            </h2>
            
            <motion.div 
              className="h-6 flex items-center justify-center"
              key={currentMessage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-gray-500 tracking-wider font-mono">
                {currentMessage}
              </p>
            </motion.div>
          </div>

          {/* Side Data Streams */}
          <div className="absolute left-8 top-1/4 bottom-1/4 w-px overflow-hidden">
            <motion.div
              className="w-full h-[200%]"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.4), transparent)',
              }}
              animate={{ y: ['-50%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="absolute right-8 top-1/4 bottom-1/4 w-px overflow-hidden">
            <motion.div
              className="w-full h-[200%]"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.4), transparent)',
              }}
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Horizontal Scan Line */}
          <motion.div
            className="absolute left-0 w-full h-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)',
              boxShadow: '0 0 20px rgba(34,211,238,0.3)',
            }}
            initial={{ top: '15%' }}
            animate={{ top: '85%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Activity dots */}
          <div className="absolute bottom-20 flex gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #22d3ee, #0891b2)',
                }}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Corner decorations - Enhanced */}
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 border-l-2 border-t-2 border-cyan-500/40" />
            <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500/60" />
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 border-r-2 border-t-2 border-cyan-500/40" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500/60" />
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 border-l-2 border-b-2 border-cyan-500/40" />
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-500/60" />
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="w-12 h-12 border-r-2 border-b-2 border-cyan-500/40" />
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-500/60" />
          </div>
          
          {/* Top/Bottom Edge Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          {/* System Info Footer */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <span className="text-[10px] text-gray-700 font-mono tracking-wider">
              CONCORD APPROVED • SECURE TRANSMISSION
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
