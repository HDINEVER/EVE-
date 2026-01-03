export interface ShipStats {
  name: string;
  class: string;
  manufacturer: string;
  mass: string;
  shield: number;
  armor: number;
  structure: number;
  capacitor: number;
  cpu: string;
  powerGrid: string;
  turretSlots: number;
  launcherSlots: number;
}

export enum ViewMode {
  TACTICAL = 'TACTICAL',
  CINEMATIC = 'CINEMATIC',
  INSPECTION = 'INSPECTION'
}

export interface Hardpoint {
  id: string;
  type: 'turret' | 'launcher' | 'utility';
  status: 'online' | 'offline';
  position: [number, number, number];
}

// 飞船配置
export interface ShipConfig {
  id: string;
  name: string;
  chineseName: string;
  class: string;
  manufacturer: string;
  faction: string;
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  stats: ShipStats;
}

// 势力主题
export interface FactionTheme {
  id: string;
  name: string;
  primary: string;      // 主色调
  secondary: string;    // 次要色
  glow: string;        // 发光颜色
  background: string;   // 背景色
}

// URL 参数
export interface ShipParams {
  shipId: string;
  factionId: string;
}