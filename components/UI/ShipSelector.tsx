import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Rocket, X, Menu } from 'lucide-react';
import { getShipsByFaction } from '../../config/ships';
import { FACTION_THEMES } from '../../config/factions';
import { ShipConfig, FactionTheme } from '../../types';

interface ShipSelectorProps {
  currentShipId: string;
  currentFactionId: string;
  themeColor?: string;
  onShipSelect?: (shipId: string, factionId: string) => void;
}

// 飞船选择器组件
const ShipSelector: React.FC<ShipSelectorProps> = ({
  currentShipId,
  currentFactionId,
  themeColor = '#0ea5e9',
  onShipSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFaction, setExpandedFaction] = useState<string | null>(currentFactionId);

  // 势力列表
  const factions = Object.values(FACTION_THEMES);

  // 处理飞船选择
  const handleShipSelect = (ship: ShipConfig) => {
    if (onShipSelect) {
      onShipSelect(ship.id, ship.faction);
    } else {
      // 默认行为：更新 URL 并刷新
      const url = new URL(window.location.href);
      url.searchParams.set('ship', ship.id);
      url.searchParams.set('faction', ship.faction);
      window.location.href = url.toString();
    }
    setIsOpen(false);
  };

  // 切换势力展开状态
  const toggleFaction = (factionId: string) => {
    setExpandedFaction(expandedFaction === factionId ? null : factionId);
  };

  return (
    <>
      {/* 触发按钮 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `linear-gradient(135deg, ${themeColor}30, rgba(0,0,0,0.8))`,
          border: `1px solid ${themeColor}50`,
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: themeColor,
          boxShadow: `0 4px 20px ${themeColor}30`,
        }}
      >
        <Menu size={20} />
        <span className="text-sm font-medium tracking-wider hidden sm:inline">选择飞船</span>
      </motion.button>

      {/* 面板背景遮罩 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 飞船选择面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 pointer-events-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div 
              className="h-full overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,30,0.98))',
                borderLeft: `1px solid ${themeColor}30`,
                boxShadow: `-10px 0 40px rgba(0,0,0,0.5)`,
              }}
            >
              {/* 头部 */}
              <div 
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: `${themeColor}30` }}
              >
                <div className="flex items-center gap-3">
                  <Rocket size={24} style={{ color: themeColor }} />
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-wider">飞船选择</h2>
                    <p className="text-xs text-gray-500">SHIP SELECTOR</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    background: `${themeColor}15`,
                    color: themeColor 
                  }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* 势力列表 */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                {factions.map((faction) => (
                  <FactionSection
                    key={faction.id}
                    faction={faction}
                    ships={getShipsByFaction(faction.id)}
                    isExpanded={expandedFaction === faction.id}
                    onToggle={() => toggleFaction(faction.id)}
                    onShipSelect={handleShipSelect}
                    currentShipId={currentShipId}
                  />
                ))}
              </div>

              {/* 底部信息 */}
              <div 
                className="p-4 border-t text-center"
                style={{ borderColor: `${themeColor}20` }}
              >
                <p className="text-xs text-gray-600 font-mono">
                  共 9 艘飞船 • 3 个势力
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 势力分组组件
interface FactionSectionProps {
  faction: FactionTheme;
  ships: ShipConfig[];
  isExpanded: boolean;
  onToggle: () => void;
  onShipSelect: (ship: ShipConfig) => void;
  currentShipId: string;
}

const FactionSection: React.FC<FactionSectionProps> = ({
  faction,
  ships,
  isExpanded,
  onToggle,
  onShipSelect,
  currentShipId
}) => {
  return (
    <motion.div
      className="rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${faction.primary}10, transparent)`,
        border: `1px solid ${faction.primary}30`,
      }}
      layout
    >
      {/* 势力标题 */}
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 transition-all"
        whileHover={{ backgroundColor: `${faction.primary}10` }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: faction.primary,
              boxShadow: `0 0 10px ${faction.glow}` 
            }}
          />
          <div className="text-left">
            <h3 
              className="font-bold tracking-wider"
              style={{ color: faction.primary }}
            >
              {faction.name}
            </h3>
            <p className="text-xs text-gray-500">{ships.length} 艘飞船</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} style={{ color: faction.primary }} />
        </motion.div>
      </motion.button>

      {/* 飞船列表 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {ships.map((ship, index) => (
                <motion.button
                  key={ship.id}
                  onClick={() => onShipSelect(ship)}
                  className="w-full p-3 rounded-lg flex items-center justify-between transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  style={{
                    background: currentShipId === ship.id 
                      ? `linear-gradient(90deg, ${faction.primary}30, transparent)`
                      : 'rgba(255,255,255,0.02)',
                    borderLeft: currentShipId === ship.id 
                      ? `3px solid ${faction.primary}` 
                      : '3px solid transparent',
                  }}
                >
                  <div className="text-left">
                    <h4 className={`font-medium ${currentShipId === ship.id ? 'text-white' : 'text-gray-300'}`}>
                      {ship.chineseName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {ship.name} • {ship.class}
                    </p>
                  </div>
                  
                  {currentShipId === ship.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        backgroundColor: `${faction.primary}30`,
                        color: faction.primary,
                      }}
                    >
                      当前
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShipSelector;
