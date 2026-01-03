import React, { useState, useEffect } from 'react';
import SceneViewer from './components/Scene/SceneViewer';
import EveUI from './components/UI/EveUI';
import ShipSelector from './components/UI/ShipSelector';
import { ViewMode } from './types';
import { useShipParams } from './hooks/useShipParams';
import { SHIP_CONFIGS, DEFAULT_SHIP_ID } from './config/ships';
import { FACTION_THEMES, DEFAULT_FACTION_ID } from './config/factions';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.INSPECTION);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  
  // 从 URL 获取飞船和势力参数
  const { shipId, factionId } = useShipParams();
  
  // 获取当前飞船配置（如果不存在则使用默认）
  const currentShip = SHIP_CONFIGS[shipId] || SHIP_CONFIGS[DEFAULT_SHIP_ID];
  
  // 获取当前势力主题（如果不存在则使用默认）
  const currentTheme = FACTION_THEMES[factionId] || FACTION_THEMES[DEFAULT_FACTION_ID];

  // 当 URL 参数变化时，可以在控制台输出日志（用于调试）
  useEffect(() => {
    console.log('Current Ship:', currentShip.name, `(${currentShip.chineseName})`);
    console.log('Current Faction:', currentTheme.name);
    console.log('Theme Colors:', currentTheme);
  }, [shipId, factionId]);

  // 动态设置背景颜色
  const dynamicStyle = {
    background: `radial-gradient(circle at 50% 50%, ${currentTheme.background} 0%, #000000 100%)`
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none"
      style={dynamicStyle}
      translate="no"
    >
      {/* 3D Layer */}
      <div className="absolute inset-0 z-0">
        <SceneViewer 
          mode={viewMode} 
          isRotating={isRotating}
          shipConfig={currentShip}
          themeColor={currentTheme.primary}
          glowColor={currentTheme.glow}
        />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <EveUI 
          stats={currentShip.stats} 
          currentMode={viewMode} 
          onModeChange={setViewMode}
          isRotating={isRotating}
          onToggleRotation={() => setIsRotating(!isRotating)}
          themeColor={currentTheme.primary}
          factionName={currentTheme.name}
        />
      </div>

      {/* Cinematic Borders (Letterbox effect in Cinematic Mode) */}
      <div 
        className={`absolute top-0 left-0 w-full bg-black transition-all duration-700 ease-in-out z-20 ${viewMode === ViewMode.CINEMATIC ? 'h-32' : 'h-0'}`} 
      />
      <div 
        className={`absolute bottom-0 left-0 w-full bg-black transition-all duration-700 ease-in-out z-20 ${viewMode === ViewMode.CINEMATIC ? 'h-32' : 'h-0'}`} 
      />
      
      {/* Vignette Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)] z-10 ${viewMode === ViewMode.CINEMATIC ? 'opacity-80' : 'opacity-40'}`} 
        style={{
          background: `radial-gradient(circle at center, transparent 50%, ${currentTheme.background}cc 100%)`
        }}
      />

      {/* Ship Selector */}
      <ShipSelector
        currentShipId={shipId}
        currentFactionId={factionId}
        themeColor={currentTheme.primary}
      />

    </div>
  );
};

export default App;