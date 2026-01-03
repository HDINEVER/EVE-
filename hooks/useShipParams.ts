// URL 参数解析 Hook
import { useMemo } from 'react';
import { ShipParams } from '../types';
import { DEFAULT_SHIP_ID } from '../config/ships';
import { DEFAULT_FACTION_ID } from '../config/factions';

/**
 * 从 URL 参数中解析飞船ID和势力ID
 * 示例: ?ship=imperial&faction=amarr
 */
export const useShipParams = (): ShipParams => {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const shipId = params.get('ship') || DEFAULT_SHIP_ID;
    const factionId = params.get('faction') || DEFAULT_FACTION_ID;

    return {
      shipId,
      factionId
    };
  }, []);
};
