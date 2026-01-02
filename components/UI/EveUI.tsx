import React, { useState } from 'react';
import { ShipStats, ViewMode } from '../../types';
import { Layers, Shield, Zap, Crosshair, ChevronRight, Activity, Cpu } from 'lucide-react';

interface EveUIProps {
  stats: ShipStats;
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  isRotating: boolean;
  onToggleRotation: () => void;
}

const EveUI: React.FC<EveUIProps> = ({ stats, currentMode, onModeChange, isRotating, onToggleRotation }) => {
  const [activeTab, setActiveTab] = useState<'attributes' | 'fitting'>('attributes');

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      
      {/* Top Header / System Info */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-widest text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] uppercase font-['Share_Tech_Mono']">
            {stats.name}
          </h1>
          <div className="flex items-center gap-2 text-cyan-500 text-sm font-semibold tracking-wider uppercase">
            <span className="bg-cyan-950/50 px-2 py-0.5 border border-cyan-800 rounded-sm">{stats.class} Class</span>
            <span className="text-slate-500">|</span>
            <span>{stats.manufacturer}</span>
          </div>
        </div>

        {/* Top Right: System Status */}
        <div className="flex gap-4">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-sm flex items-center gap-3 shadow-lg">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">System Integrity</span>
              <span className="text-emerald-400 font-mono text-lg">100%</span>
            </div>
            <Activity size={20} className="text-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Center Reticle (Tactical Mode) */}
      {currentMode === ViewMode.TACTICAL && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-500/10 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-[480px] h-[480px] border border-dashed border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
      )}

      {/* Main Content Area: Left & Right Panels */}
      <div className="flex justify-between items-end h-full mt-4">
        
        {/* Left Panel: Controls */}
        <div className="flex flex-col gap-4 pointer-events-auto max-w-xs w-full">
          <div className="bg-slate-900/90 backdrop-blur-md border-l-2 border-cyan-600 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-4 relative overflow-hidden group">
            {/* Decorative decorative glitch lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-transparent opacity-50" />
            
            <h3 className="text-cyan-400 text-sm uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
              <Layers size={16} /> View Control
            </h3>
            
            <div className="flex flex-col gap-2">
              {(Object.keys(ViewMode) as Array<keyof typeof ViewMode>).map((modeKey) => (
                <button
                  key={modeKey}
                  onClick={() => onModeChange(ViewMode[modeKey])}
                  className={`
                    px-4 py-2 text-left text-sm font-medium transition-all duration-200 border border-transparent
                    ${currentMode === ViewMode[modeKey] 
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(8,145,178,0.2)]' 
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-cyan-200'}
                  `}
                >
                  <span className="flex items-center justify-between">
                    {ViewMode[modeKey]}
                    {currentMode === ViewMode[modeKey] && <ChevronRight size={14} />}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50">
               <button
                  onClick={onToggleRotation}
                  className={`
                    w-full px-4 py-2 text-sm font-medium transition-all duration-200 border
                    ${isRotating
                      ? 'bg-amber-950/40 text-amber-500 border-amber-600/50' 
                      : 'bg-slate-800/50 text-slate-400 border-transparent hover:border-slate-600'}
                  `}
                >
                  {isRotating ? 'HALT ROTATION' : 'INITIATE ROTATION'}
                </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Ship Stats (The "Fitting" Window style) */}
        <div className="pointer-events-auto w-80">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl overflow-hidden rounded-tl-xl">
             {/* Header Tabs */}
             <div className="flex border-b border-slate-700">
                <button 
                  onClick={() => setActiveTab('attributes')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors ${activeTab === 'attributes' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500'}`}
                >
                  Attributes
                </button>
                <button 
                  onClick={() => setActiveTab('fitting')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors ${activeTab === 'fitting' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500'}`}
                >
                  Fitting
                </button>
             </div>

             <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                {activeTab === 'attributes' ? (
                  <div className="space-y-4">
                    {/* Defense Group */}
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-2 flex items-center gap-1"><Shield size={10} /> Defense</h4>
                      <StatRow label="Shield HP" value={stats.shield.toLocaleString()} unit="HP" barValue={70} color="bg-blue-500" />
                      <StatRow label="Armor HP" value={stats.armor.toLocaleString()} unit="HP" barValue={45} color="bg-orange-500" />
                      <StatRow label="Structure" value={stats.structure.toLocaleString()} unit="HP" barValue={30} color="bg-red-500" />
                    </div>

                     {/* Engineering Group */}
                     <div>
                      <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-2 mt-4 flex items-center gap-1"><Zap size={10} /> Capacitor</h4>
                      <StatRow label="Capacity" value={stats.capacitor.toLocaleString()} unit="GJ" barValue={85} color="bg-yellow-500" />
                      <StatRow label="Recharge" value="455" unit="s" />
                    </div>

                    {/* Fitting Group */}
                     <div>
                      <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-2 mt-4 flex items-center gap-1"><Cpu size={10} /> Fitting</h4>
                      <StatRow label="CPU" value={stats.cpu} unit="tf" barValue={92} color="bg-purple-500" />
                      <StatRow label="Powergrid" value={stats.powerGrid} unit="MW" barValue={64} color="bg-red-400" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                      <span className="flex items-center gap-2"><Crosshair size={12} className="text-red-400"/> 200mm AutoCannon II</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                      <span className="flex items-center gap-2"><Crosshair size={12} className="text-red-400"/> 200mm AutoCannon II</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                      <span className="flex items-center gap-2"><Crosshair size={12} className="text-red-400"/> Rocket Launcher II</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                       <span className="flex items-center gap-2"><Zap size={12} className="text-yellow-400"/> 1MN Afterburner II</span>
                       <span className="text-emerald-400">ONLINE</span>
                    </div>
                  </div>
                )}
             </div>
             
             {/* Bottom Cap/Status */}
             <div className="bg-slate-950 p-2 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>SIMULATION MODE</span>
                <span>ID: 99-AK-2</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper for stats
const StatRow: React.FC<{label: string, value: string, unit: string, barValue?: number, color?: string}> = ({label, value, unit, barValue, color = "bg-cyan-500"}) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs font-mono mb-0.5">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200">{value} <span className="text-slate-500">{unit}</span></span>
    </div>
    {barValue !== undefined && (
      <div className="h-1 w-full bg-slate-800 rounded-sm overflow-hidden">
        <div className={`h-full ${color}`} style={{width: `${barValue}%`}}></div>
      </div>
    )}
  </div>
);

export default EveUI;