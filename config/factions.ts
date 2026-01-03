// 势力主题配置
import { FactionTheme } from '../types';

export const FACTION_THEMES: Record<string, FactionTheme> = {
  'amarr': {
    id: 'amarr',
    name: '艾玛帝国',
    primary: '#d4af37',      // 金色
    secondary: '#8b6914',    // 深金色
    glow: 'rgba(212, 175, 55, 0.8)',
    background: '#1a1000'    // 深金色背景
  },
  'caldari': {
    id: 'caldari',
    name: '加达里合众国',
    primary: '#44ffdd',      // 青色
    secondary: '#1a7a6a',    // 深青色
    glow: 'rgba(68, 255, 221, 0.8)',
    background: '#001a18'    // 深青色背景
  },
  'gallente': {
    id: 'gallente',
    name: '盖伦特联邦',
    primary: '#a855f7',      // 紫色
    secondary: '#6b21a8',    // 深紫色
    glow: 'rgba(168, 85, 247, 0.8)',
    background: '#0f001a'    // 深紫色背景
  }
};

// 默认势力（如果URL参数无效）
export const DEFAULT_FACTION_ID = 'amarr';
