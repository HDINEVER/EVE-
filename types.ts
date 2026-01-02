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