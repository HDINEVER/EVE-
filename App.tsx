import React, { useState } from 'react';
import SceneViewer from './components/Scene/SceneViewer';
import EveUI from './components/UI/EveUI';
import { ShipStats, ViewMode } from './types';

// Mock Data for the ship
const MOCK_SHIP_STATS: ShipStats = {
  name: "RIVIERA",
  class: "ASSAULT FRIGATE",
  manufacturer: "ISHUKONE CORP",
  mass: "1,250,000 kg",
  shield: 850,
  armor: 620,
  structure: 550,
  capacitor: 450,
  cpu: "185",
  powerGrid: "62",
  turretSlots: 3,
  launcherSlots: 2,
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.INSPECTION);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* 3D Layer */}
      <div className="absolute inset-0 z-0">
        <SceneViewer mode={viewMode} isRotating={isRotating} />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <EveUI 
          stats={MOCK_SHIP_STATS} 
          currentMode={viewMode} 
          onModeChange={setViewMode}
          isRotating={isRotating}
          onToggleRotation={() => setIsRotating(!isRotating)}
        />
      </div>

      {/* Cinematic Borders (Letterbox effect in Cinematic Mode) */}
      <div 
        className={`absolute top-0 left-0 w-full bg-black transition-all duration-700 ease-in-out z-20 ${viewMode === ViewMode.CINEMATIC ? 'h-32' : 'h-0'}`} 
      />
      <div 
        className={`absolute bottom-0 left-0 w-full bg-black transition-all duration-700 ease-in-out z-20 ${viewMode === ViewMode.CINEMATIC ? 'h-32' : 'h-0'}`} 
      />
      
      {/* Vignette Overlay (always slightly present for immersion, heavier in Cinematic) */}
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)] z-10 ${viewMode === ViewMode.CINEMATIC ? 'opacity-80' : 'opacity-40'}`} />

    </div>
  );
};

export default App;