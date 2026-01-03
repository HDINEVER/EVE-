import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShipStats, ViewMode } from '../../types';
import { Layers, Shield, Zap, Crosshair, ChevronRight, Activity, Cpu, ChevronLeft, Radio, Target, Scan } from 'lucide-react';

interface EveUIProps {
  stats: ShipStats;
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  isRotating: boolean;
  onToggleRotation: () => void;
  themeColor?: string;
  factionName?: string;
}

// Hook to track window size
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
};

// Glassmorphism Card Component with Sci-Fi Style
const GlassPanel: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  borderColor?: string;
  accentSide?: 'left' | 'right' | 'both';
}> = ({ children, className = '', borderColor = 'cyan', accentSide = 'left' }) => {
  const getBorderColorValue = () => borderColor === 'cyan' ? '#22d3ee' : borderColor;
  const getGlowColor = () => borderColor === 'cyan' ? 'rgba(34,211,238,0.3)' : `${borderColor}40`;
  
  return (
    <div 
      className={`relative overflow-hidden group ${className}`}
      style={{
        clipPath: accentSide === 'right' 
          ? 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
          : 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
      }}
    >
      {/* Main Glass Background */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30" />
      
      {/* Hover Glow Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(ellipse at ${accentSide === 'right' ? '100%' : '0%'} 50%, ${getGlowColor()}, transparent 60%)`
        }}
      />
      
      {/* Accent Border Line */}
      {(accentSide === 'left' || accentSide === 'both') && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-[2px] transition-shadow duration-300"
          style={{ 
            backgroundColor: getBorderColorValue(),
            boxShadow: `0 0 8px 1px ${getGlowColor()}`
          }}
        />
      )}
      {(accentSide === 'right' || accentSide === 'both') && (
        <div 
          className="absolute right-0 top-0 bottom-0 w-[2px] transition-shadow duration-300"
          style={{ 
            backgroundColor: getBorderColorValue(),
            boxShadow: `0 0 8px 1px ${getGlowColor()}`
          }}
        />
      )}
      
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const EveUI: React.FC<EveUIProps> = ({ 
  stats, 
  currentMode, 
  onModeChange, 
  isRotating, 
  onToggleRotation,
  themeColor = '#0ea5e9',
  factionName = 'Unknown Faction'
}) => {
  const [activeTab, setActiveTab] = useState<'attributes' | 'fitting'>('attributes');
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const { width } = useWindowSize();

  // Screen size breakpoints
  const isSmallScreen = width < 900;
  const isMediumScreen = width < 1200;

  // Panels auto-hide on small screens, show on hover
  const shouldAutoHide = isSmallScreen;

  // Calculate dynamic offset based on screen size and hover state
  const getLeftOffset = () => {
    if (!shouldAutoHide) return 0; // Always visible on large screens
    return leftHovered ? 0 : -240; // Hide when not hovered on small screens
  };

  const getRightOffset = () => {
    if (!shouldAutoHide) return 0; // Always visible on large screens
    return rightHovered ? 0 : 240; // Hide when not hovered on small screens
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-2 sm:p-4 md:p-6 notranslate" translate="no">
      
      {/* Floating Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full"
          style={{
            top: '-10%',
            left: '-5%',
            background: themeColor ? `radial-gradient(circle, ${themeColor}15 0%, ${themeColor}05 40%, transparent 70%)` : 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[35vw] h-[35vw] rounded-full"
          style={{
            bottom: '-5%',
            right: '-5%',
            background: themeColor ? `radial-gradient(circle, ${themeColor}10 0%, transparent 60%)` : 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
            scale: [1, 0.9, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top Header / System Info */}
      <motion.div 
        className="flex justify-between items-start pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <GlassPanel 
          className="px-4 py-3 sm:px-6 sm:py-4"
          borderColor={themeColor || '#22d3ee'}
          accentSide="left"
        >
          <div className="flex flex-col gap-1">
            {/* Faction Badge */}
            <div className={`flex items-center gap-2 mb-1 ${isSmallScreen ? 'text-[8px]' : 'text-[10px]'}`}>
              <Radio size={isSmallScreen ? 8 : 10} style={{ color: themeColor || '#0ea5e9' }} className="animate-pulse" />
              <span className="uppercase tracking-[0.3em] text-gray-400 font-mono">{factionName}</span>
            </div>
            
            <h1 
              className={`font-bold tracking-widest uppercase font-['Share_Tech_Mono'] ${isSmallScreen ? 'text-xl' : isMediumScreen ? 'text-2xl' : 'text-4xl'}`}
              style={{ 
                color: themeColor || '#0ea5e9',
                textShadow: themeColor ? `0 0 20px ${themeColor}60, 0 0 40px ${themeColor}30` : '0 0 20px rgba(14, 165, 233, 0.6), 0 0 40px rgba(14, 165, 233, 0.3)'
              }}
            >
              {stats.name}
            </h1>
            
            <div className={`flex items-center gap-2 text-gray-400 font-semibold tracking-wider uppercase ${isSmallScreen ? 'text-[10px]' : 'text-sm'}`}>
              <span 
                className="px-2 py-0.5 border rounded-sm backdrop-blur-sm"
                style={{ 
                  borderColor: themeColor ? `${themeColor}50` : 'rgba(14, 165, 233, 0.5)',
                  backgroundColor: themeColor ? `${themeColor}15` : 'rgba(14, 165, 233, 0.15)',
                  color: themeColor || '#0ea5e9'
                }}
              >
                {stats.class} Class
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-gray-500">{stats.manufacturer}</span>
            </div>
          </div>
        </GlassPanel>

        {/* Top Right: System Status */}
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassPanel 
            className={`flex items-center gap-2 shadow-lg ${isSmallScreen ? 'p-2' : 'p-3 gap-3'}`}
            borderColor="emerald"
            accentSide="right"
          >
            <div className="flex flex-col items-end">
              <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-mono">System Integrity</span>
              <span className={`text-emerald-400 font-mono font-bold ${isSmallScreen ? 'text-sm' : 'text-lg'}`}>
                100<span className="text-emerald-600">%</span>
              </span>
            </div>
            <div className="relative">
              <Activity size={isSmallScreen ? 16 : 20} className="text-emerald-500" />
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>

      {/* Center Reticle (Tactical Mode) - Enhanced */}
      <AnimatePresence>
        {currentMode === ViewMode.TACTICAL && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            {/* Outer Ring */}
            <div 
              className="w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full flex items-center justify-center"
              style={{ 
                border: themeColor ? `1px solid ${themeColor}15` : '1px solid rgba(14, 165, 233, 0.15)',
                boxShadow: themeColor ? `0 0 30px ${themeColor}10, inset 0 0 30px ${themeColor}05` : '0 0 30px rgba(14, 165, 233, 0.1), inset 0 0 30px rgba(14, 165, 233, 0.05)'
              }}
            >
              {/* Rotating Dashed Circle */}
              <motion.div 
                className="absolute w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full"
                style={{ 
                  border: themeColor ? `1px dashed ${themeColor}20` : '1px dashed rgba(14, 165, 233, 0.2)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring */}
              <motion.div 
                className="absolute w-[200px] sm:w-[280px] md:w-[350px] h-[200px] sm:h-[280px] md:h-[350px] rounded-full"
                style={{ 
                  border: themeColor ? `1px solid ${themeColor}10` : '1px solid rgba(14, 165, 233, 0.1)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Crosshair Lines */}
              <div 
                className="absolute top-0 w-px h-full"
                style={{ background: themeColor ? `linear-gradient(to bottom, transparent, ${themeColor}20, transparent)` : 'linear-gradient(to bottom, transparent, rgba(14, 165, 233, 0.2), transparent)' }}
              />
              <div 
                className="absolute left-0 h-px w-full"
                style={{ background: themeColor ? `linear-gradient(to right, transparent, ${themeColor}20, transparent)` : 'linear-gradient(to right, transparent, rgba(14, 165, 233, 0.2), transparent)' }}
              />
              
              {/* Center Target */}
              <motion.div 
                className="absolute w-4 h-4"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target size={16} style={{ color: themeColor || '#0ea5e9' }} />
              </motion.div>
              
              {/* Corner Brackets */}
              {[0, 90, 180, 270].map((angle) => {
                const borderColor = themeColor ? `${themeColor}40` : 'rgba(14, 165, 233, 0.4)';
                return (
                  <motion.div
                    key={angle}
                    className="absolute w-8 h-8"
                    style={{transform: `rotate(${angle}deg) translateY(-${angle === 0 || angle === 180 ? '140px' : '140px'})`,
                      borderLeft: `2px solid ${borderColor}`,
                      borderTop: `2px solid ${borderColor}`,
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, delay: angle / 360, repeat: Infinity }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area: Left & Right Panels */}
      <div className="flex justify-between items-end h-full mt-4 relative">
        
        {/* Left Panel: Controls */}
        <motion.div 
          className="flex items-end gap-1 pointer-events-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: getLeftOffset() }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
        >
          <GlassPanel 
            className={`relative overflow-hidden ${isSmallScreen ? 'p-3 w-56' : 'p-4 w-72'}`}
            borderColor={themeColor || '#22d3ee'}
            accentSide="left"
          >
            {/* Animated Top Line */}
            <motion.div 
              className="absolute top-0 left-0 h-[2px]"
              style={{ backgroundColor: themeColor || '#0ea5e9' }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <h3 className={`text-gray-300 uppercase tracking-[0.2em] mb-3 font-bold flex items-center gap-2 ${isSmallScreen ? 'text-xs' : 'text-sm mb-4'}`}>
              <Layers size={isSmallScreen ? 12 : 16} style={{ color: themeColor || '#0ea5e9' }} /> 
              <span>View Control</span>
              <span className="ml-auto text-[8px] text-gray-600 font-mono">SYS.01</span>
            </h3>
            
            <div className="flex flex-col gap-1 sm:gap-2">
              {(Object.keys(ViewMode) as Array<keyof typeof ViewMode>).map((modeKey, index) => (
                <motion.button
                  key={modeKey}
                  onClick={() => onModeChange(ViewMode[modeKey])}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium transition-all duration-200 overflow-hidden
                    ${currentMode === ViewMode[modeKey] 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'}
                  `}
                  style={{
                    background: currentMode === ViewMode[modeKey] 
                      ? (themeColor ? `linear-gradient(90deg, ${themeColor}30, transparent)` : 'linear-gradient(90deg, rgba(14, 165, 233, 0.3), transparent)')
                      : 'rgba(255,255,255,0.03)',
                    borderLeft: currentMode === ViewMode[modeKey] 
                      ? `2px solid ${themeColor || '#0ea5e9'}` 
                      : '2px solid transparent',
                  }}
                >
                  {/* Hover Glow */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    style={{ backgroundColor: themeColor || '#0ea5e9' }}
                  />
                  
                  <span className="flex items-center justify-between relative z-10">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ 
                        backgroundColor: currentMode === ViewMode[modeKey] ? (themeColor || '#0ea5e9') : '#4a5568' 
                      }} />
                      {ViewMode[modeKey]}
                    </span>
                    {currentMode === ViewMode[modeKey] && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <ChevronRight size={isSmallScreen ? 10 : 14} style={{ color: themeColor || '#0ea5e9' }} />
                      </motion.span>
                    )}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-white/10">
              <motion.button
                onClick={onToggleRotation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative w-full px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 overflow-hidden
                  flex items-center justify-center gap-2
                `}
                style={{
                  background: isRotating 
                    ? 'linear-gradient(90deg, rgba(245,158,11,0.2), transparent)' 
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isRotating ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  color: isRotating ? '#f59e0b' : '#9ca3af',
                }}
              >
                <motion.div
                  animate={{ rotate: isRotating ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isRotating ? Infinity : 0, ease: "linear" }}
                >
                  <Scan size={isSmallScreen ? 12 : 14} />
                </motion.div>
                {isRotating ? 'HALT ROTATION' : 'INITIATE ROTATION'}
              </motion.button>
            </div>
          </GlassPanel>
          
          {/* Left Hover Trigger Area (visible on small screens when panel is hidden) */}
          {shouldAutoHide && !leftHovered && (
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center"
              style={{ background: themeColor ? `linear-gradient(to right, ${themeColor}20, transparent)` : 'linear-gradient(to right, rgba(14, 165, 233, 0.2), transparent)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronRight size={16} style={{ color: themeColor || '#0ea5e9' }} />
            </motion.div>
          )}
        </motion.div>

        {/* Right Panel: Ship Stats */}
        <motion.div 
          className="flex items-end gap-1 pointer-events-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: getRightOffset() }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
        >
          {/* Right Hover Trigger Area (visible on small screens when panel is hidden) */}
          {shouldAutoHide && !rightHovered && (
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center"
              style={{ background: themeColor ? `linear-gradient(to left, ${themeColor}20, transparent)` : 'linear-gradient(to left, rgba(14, 165, 233, 0.2), transparent)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronLeft size={16} style={{ color: themeColor || '#0ea5e9' }} />
            </motion.div>
          )}

          <GlassPanel 
            className={`overflow-hidden ${isSmallScreen ? 'w-56' : isMediumScreen ? 'w-64' : 'w-80'}`}
            borderColor={themeColor || '#22d3ee'}
            accentSide="right"
          >
            {/* Header Tabs */}
            <div className="flex border-b border-white/10">
              <motion.button 
                onClick={() => setActiveTab('attributes')}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all relative overflow-hidden ${
                  activeTab === 'attributes' ? 'text-white' : 'text-gray-600'
                }`}
              >
                {activeTab === 'attributes' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: themeColor || '#0ea5e9' }}
                    layoutId="activeTab"
                  />
                )}
                Attributes
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('fitting')}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all relative overflow-hidden ${
                  activeTab === 'fitting' ? 'text-white' : 'text-gray-600'
                }`}
              >
                {activeTab === 'fitting' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: themeColor || '#0ea5e9' }}
                    layoutId="activeTab"
                  />
                )}
                Fitting
              </motion.button>
            </div>

            <motion.div 
              className={`overflow-y-auto custom-scrollbar ${isSmallScreen ? 'p-3 max-h-[200px]' : 'p-4 max-h-[320px]'}`}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {activeTab === 'attributes' ? (
                  <motion.div 
                    key="attributes"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Defense Group */}
                    <div>
                      <h4 className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold mb-2 sm:mb-3 flex items-center gap-1.5 tracking-wider">
                        <Shield size={isSmallScreen ? 8 : 10} className="text-blue-400" /> Defense Systems
                      </h4>
                      <StatRow label="Shield HP" value={stats.shield.toLocaleString()} unit="HP" barValue={70} color="blue" isSmall={isSmallScreen} />
                      <StatRow label="Armor HP" value={stats.armor.toLocaleString()} unit="HP" barValue={45} color="orange" isSmall={isSmallScreen} />
                      <StatRow label="Structure" value={stats.structure.toLocaleString()} unit="HP" barValue={30} color="red" isSmall={isSmallScreen} />
                    </div>

                    {/* Engineering Group */}
                    <div>
                      <h4 className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold mb-2 sm:mb-3 flex items-center gap-1.5 tracking-wider">
                        <Zap size={isSmallScreen ? 8 : 10} className="text-yellow-400" /> Capacitor
                      </h4>
                      <StatRow label="Capacity" value={stats.capacitor.toLocaleString()} unit="GJ" barValue={85} color="yellow" isSmall={isSmallScreen} />
                      <StatRow label="Recharge" value="455" unit="s" isSmall={isSmallScreen} />
                    </div>

                    {/* Fitting Group */}
                    <div>
                      <h4 className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold mb-2 sm:mb-3 flex items-center gap-1.5 tracking-wider">
                        <Cpu size={isSmallScreen ? 8 : 10} className="text-purple-400" /> Fitting Resources
                      </h4>
                      <StatRow label="CPU" value={stats.cpu} unit="tf" barValue={92} color="purple" isSmall={isSmallScreen} />
                      <StatRow label="Powergrid" value={stats.powerGrid} unit="MW" barValue={64} color="pink" isSmall={isSmallScreen} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="fitting"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    {/* High Slots */}
                    <div className={`text-gray-400 flex items-center justify-between p-2 ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}
                      style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid rgba(239, 68, 68, 0.3)' }}>
                      <span className="flex items-center gap-2">
                        <Crosshair size={isSmallScreen ? 10 : 12} className="text-red-400"/>
                        <span>200mm AutoCannon II</span>
                      </span>
                      <span className="text-emerald-400 text-[10px]">ONLINE</span>
                    </div>
                    
                    <div className={`text-gray-400 flex items-center justify-between p-2 ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}
                      style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid rgba(239, 68, 68, 0.3)' }}>
                      <span className="flex items-center gap-2">
                        <Crosshair size={isSmallScreen ? 10 : 12} className="text-red-400"/>
                        <span>200mm AutoCannon II</span>
                      </span>
                      <span className="text-emerald-400 text-[10px]">ONLINE</span>
                    </div>
                    
                    <div className={`text-gray-400 flex items-center justify-between p-2 ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}
                      style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid rgba(239, 68, 68, 0.3)' }}>
                      <span className="flex items-center gap-2">
                        <Crosshair size={isSmallScreen ? 10 : 12} className="text-red-400"/>
                        <span>Rocket Launcher II</span>
                      </span>
                      <span className="text-emerald-400 text-[10px]">ONLINE</span>
                    </div>
                    
                    {/* Mid Slot */}
                    <div className={`text-gray-400 flex items-center justify-between p-2 ${isSmallScreen ? 'text-[10px]' : 'text-xs'}`}
                      style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid rgba(234, 179, 8, 0.3)' }}>
                      <span className="flex items-center gap-2">
                        <Zap size={isSmallScreen ? 10 : 12} className="text-yellow-400"/>
                        <span>1MN Afterburner II</span>
                      </span>
                      <span className="text-emerald-400 text-[10px]">ONLINE</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Bottom Status Bar */}
            <div 
              className={`border-t border-white/10 flex justify-between items-center text-gray-600 font-mono ${isSmallScreen ? 'p-2 text-[8px]' : 'p-3 text-[10px]'}`}
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SIMULATION MODE
              </span>
              <span className="text-gray-700">ID: 99-AK-2</span>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced StatRow with color theming
const StatRow: React.FC<{
  label: string;
  value: string;
  unit: string;
  barValue?: number;
  color?: string;
  isSmall?: boolean;
}> = ({ label, value, unit, barValue, color = "cyan", isSmall = false }) => {
  const colorMap: Record<string, { bar: string; glow: string; text: string }> = {
    blue: { bar: 'bg-blue-500', glow: 'rgba(59, 130, 246, 0.5)', text: 'text-blue-400' },
    orange: { bar: 'bg-orange-500', glow: 'rgba(249, 115, 22, 0.5)', text: 'text-orange-400' },
    red: { bar: 'bg-red-500', glow: 'rgba(239, 68, 68, 0.5)', text: 'text-red-400' },
    yellow: { bar: 'bg-yellow-500', glow: 'rgba(234, 179, 8, 0.5)', text: 'text-yellow-400' },
    purple: { bar: 'bg-purple-500', glow: 'rgba(168, 85, 247, 0.5)', text: 'text-purple-400' },
    pink: { bar: 'bg-pink-500', glow: 'rgba(236, 72, 153, 0.5)', text: 'text-pink-400' },
    cyan: { bar: 'bg-cyan-500', glow: 'rgba(34, 211, 238, 0.5)', text: 'text-cyan-400' },
  };
  
  const colors = colorMap[color] || colorMap.cyan;
  
  return (
    <motion.div 
      className={isSmall ? "mb-2" : "mb-3"}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex justify-between font-mono ${isSmall ? 'text-[10px] mb-0.5' : 'text-xs mb-1'}`}>
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-300">
          {value} <span className="text-gray-600">{unit}</span>
        </span>
      </div>
      {barValue !== undefined && (
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className={`h-full ${colors.bar} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${barValue}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              boxShadow: `0 0 10px ${colors.glow}`,
            }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px)',
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default EveUI;