// 飞船配置数据 (9艘飞船)
import { ShipConfig } from '../types';

// R2 CDN 基础路径
const R2_BASE_URL = 'https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/models';

// 生成模型URL的辅助函数
const getModelUrl = (modelName: string) => `${R2_BASE_URL}/${modelName}_optimized.glb`;

// Imperial 使用原有的 ship_optimized.glb
const IMPERIAL_MODEL_URL = `${R2_BASE_URL}/ship_optimized.glb`;

export const SHIP_CONFIGS: Record<string, ShipConfig> = {
  // ========== 艾玛帝国 (Amarr Empire) ==========
  'imperial': {
    id: 'imperial',
    name: 'Imperial Issue',
    chineseName: '帝国号',
    class: 'Battleship',
    manufacturer: 'Amarr Empire',
    faction: 'amarr',
    modelPath: IMPERIAL_MODEL_URL,
    scale: 1.3,
    stats: {
      name: "Imperial Issue",
      class: "Battleship",
      manufacturer: "Amarr Empire",
      mass: "98,500,000 kg",
      shield: 6800,
      armor: 8500,
      structure: 7200,
      capacitor: 5800,
      cpu: "645",
      powerGrid: "18500",
      turretSlots: 8,
      launcherSlots: 0,
    }
  },
  'paladin': {
    id: 'paladin',
    name: 'Paladin',
    chineseName: '先锋者级',
    class: 'Marauder',
    manufacturer: 'Amarr Empire',
    faction: 'amarr',
    modelPath: getModelUrl('paladin'),
    scale: 1.3,
    stats: {
      name: "Paladin",
      class: "Marauder",
      manufacturer: "Amarr Empire",
      mass: "115,000,000 kg",
      shield: 5200,
      armor: 9800,
      structure: 8500,
      capacitor: 6500,
      cpu: "750",
      powerGrid: "22000",
      turretSlots: 4,
      launcherSlots: 0,
    }
  },
  'avatar': {
    id: 'avatar',
    name: 'Avatar',
    chineseName: '神使级泰坦',
    class: 'Titan',
    manufacturer: 'Amarr Empire',
    faction: 'amarr',
    modelPath: getModelUrl('avatar'),
    scale: 1.9,
    stats: {
      name: "Avatar",
      class: "Titan",
      manufacturer: "Amarr Empire",
      mass: "2,400,000,000 kg",
      shield: 250000,
      armor: 400000,
      structure: 350000,
      capacitor: 125000,
      cpu: "1250",
      powerGrid: "750000",
      turretSlots: 6,
      launcherSlots: 0,
    }
  },

  // ========== 加达里合众国 (Caldari State) ==========
  'naga': {
    id: 'naga',
    name: 'Naga',
    chineseName: '娜迦级',
    class: 'Battlecruiser',
    manufacturer: 'Caldari State',
    faction: 'caldari',
    modelPath: getModelUrl('naga'),
    scale: 1.3,
    stats: {
      name: "Naga",
      class: "Battlecruiser",
      manufacturer: "Caldari State",
      mass: "18,500,000 kg",
      shield: 4200,
      armor: 2800,
      structure: 3500,
      capacitor: 2200,
      cpu: "435",
      powerGrid: "9200",
      turretSlots: 8,
      launcherSlots: 0,
    }
  },
  'cerberus': {
    id: 'cerberus',
    name: 'Cerberus',
    chineseName: '希尔博拉斯',
    class: 'Heavy Assault Cruiser',
    manufacturer: 'Caldari State',
    faction: 'caldari',
    modelPath: getModelUrl('cerberus'),
    scale: 1.3,
    stats: {
      name: "Cerberus",
      class: "Heavy Assault Cruiser",
      manufacturer: "Caldari State",
      mass: "12,850,000 kg",
      shield: 3800,
      armor: 2200,
      structure: 2900,
      capacitor: 1950,
      cpu: "385",
      powerGrid: "7500",
      turretSlots: 0,
      launcherSlots: 5,
    }
  },
  'corax': {
    id: 'corax',
    name: 'Corax',
    chineseName: '渡鸦级',
    class: 'Destroyer',
    manufacturer: 'Caldari State',
    faction: 'caldari',
    modelPath: getModelUrl('corax'),
    scale: 1.3,
    stats: {
      name: "Corax",
      class: "Destroyer",
      manufacturer: "Caldari State",
      mass: "1,480,000 kg",
      shield: 950,
      armor: 550,
      structure: 680,
      capacitor: 580,
      cpu: "195",
      powerGrid: "48",
      turretSlots: 0,
      launcherSlots: 7,
    }
  },

  // ========== 盖伦特联邦 (Gallente Federation) ==========
  'tristan': {
    id: 'tristan',
    name: 'Tristan',
    chineseName: '特里斯坦',
    class: 'Frigate',
    manufacturer: 'Gallente Federation',
    faction: 'gallente',
    modelPath: getModelUrl('tristan'),
    scale: 1.3,
    stats: {
      name: "Tristan",
      class: "Frigate",
      manufacturer: "Gallente Federation",
      mass: "1,180,000 kg",
      shield: 420,
      armor: 580,
      structure: 520,
      capacitor: 380,
      cpu: "160",
      powerGrid: "38",
      turretSlots: 3,
      launcherSlots: 2,
    }
  },
  'thalia': {
    id: 'thalia',
    name: 'Thalia',
    chineseName: '塔利亚',
    class: 'Logistics Frigate',
    manufacturer: 'Gallente Federation',
    faction: 'gallente',
    modelPath: getModelUrl('thalia'),
    scale: 1.3,
    stats: {
      name: "Thalia",
      class: "Logistics Frigate",
      manufacturer: "Gallente Federation",
      mass: "1,350,000 kg",
      shield: 580,
      armor: 680,
      structure: 550,
      capacitor: 950,
      cpu: "185",
      powerGrid: "42",
      turretSlots: 2,
      launcherSlots: 0,
    }
  },
  'atron': {
    id: 'atron',
    name: 'Atron',
    chineseName: '阿特龙级',
    class: 'Interceptor',
    manufacturer: 'Gallente Federation',
    faction: 'gallente',
    modelPath: getModelUrl('atron'),
    scale: 1.3,
    stats: {
      name: "Atron",
      class: "Interceptor",
      manufacturer: "Gallente Federation",
      mass: "980,000 kg",
      shield: 380,
      armor: 520,
      structure: 480,
      capacitor: 350,
      cpu: "150",
      powerGrid: "35",
      turretSlots: 3,
      launcherSlots: 0,
    }
  },
};

// 默认飞船（如果URL参数无效）
export const DEFAULT_SHIP_ID = 'imperial';

// 辅助函数：获取所有飞船ID
export const getAllShipIds = (): string[] => Object.keys(SHIP_CONFIGS);

// 辅助函数：按势力分组获取飞船
export const getShipsByFaction = (factionId: string): ShipConfig[] => {
  return Object.values(SHIP_CONFIGS).filter(ship => ship.faction === factionId);
};

// 辅助函数：获取所有飞船配置数组
export const getAllShips = (): ShipConfig[] => Object.values(SHIP_CONFIGS);
