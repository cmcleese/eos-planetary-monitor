import { useState, useEffect, useCallback } from 'react';
import { STATUS, type StatusKey } from '@/constants/statuses';
import { GEO_STORM_LEVELS } from '@/constants/space-weather';

export interface DashboardTile {
  name: string;
  tooltip: string;
  value?: string | number | Record<string, string | number>;
  status: StatusKey;
  isLive?: boolean;
}

export interface DashboardState {
  isLoading: boolean;
  satelliteCount: DashboardTile;
  solarActivity: DashboardTile;
  spaceWeather: DashboardTile;
  issEnvironment: DashboardTile;
  neoThreat: DashboardTile;
  DSNStatus: DashboardTile;
}

const dashboardInitialState: DashboardState = {
  isLoading: true,
  satelliteCount: {
    name: 'Satellites',
    tooltip: 'Number of active satellites in orbit',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
  solarActivity: {
    name: 'Solar Activity',
    tooltip: 'Current solar activity level',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
  spaceWeather: {
    name: 'Space Weather',
    tooltip: 'Current space weather conditions',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
  issEnvironment: {
    name: 'ISS Status',
    tooltip: 'International Space Station Environment',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
  neoThreat: {
    name: 'NEO Threat',
    tooltip: 'Near-Earth Object Threat Level',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
  DSNStatus: {
    name: 'DSN Status',
    tooltip: 'Deep Space Network Status',
    value: '--',
    status: STATUS.INFO as StatusKey,
  },
};

export function useDashboardData() {
  const [dashboardState, setDashboardState] = useState<DashboardState>(dashboardInitialState);

  // Helper to update a specific tile in our state object
  const updateTile = useCallback((tileId: keyof DashboardState, data: Partial<DashboardTile>) => {
    setDashboardState((prev) => ({
      ...prev,
      [tileId]: { ...(prev[tileId] as any), ...data },
    }));
  }, []);

  // Fetch ISS environment (Real-time)
  const fetchISS = async () => {
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (!res.ok) throw new Error('API_UNAVAILABLE');
      const data = await res.json();
      updateTile('issEnvironment', {
        value: data.visibility.toUpperCase(),
        status: (data.visibility === 'daylight' ? STATUS.NORMAL : STATUS.WARNING) as StatusKey,
        isLive: true,
      });
    } catch (e) {
      console.warn('ISS connection lost, using nominal fallback.', e);
      updateTile('issEnvironment', {
        value: 'STABLE (SIM)',
        status: STATUS.NORMAL as StatusKey,
        isLive: false,
      });
    }
  };

  // Fetch Space Weather (NOAA Kp-Index)
  const fetchWeather = async () => {
    try {
      const res = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');
      if (!res.ok) throw new Error('API_UNAVAILABLE');
      const data = await res.json();

      const rVal = parseInt(data['0'].r) || 0;
      const sVal = parseInt(data['0'].s) || 0;
      const gVal = parseInt(data['0'].g) || 0;

      const geoStormLevel = GEO_STORM_LEVELS[gVal];
      updateTile('spaceWeather', {
        value: geoStormLevel?.label || 'QUIET',
        status: (geoStormLevel?.status as StatusKey) || (STATUS.NORMAL as StatusKey),
        isLive: rVal > 0 || sVal > 0 || gVal > 0,
      });

      // Update Solar Activity (R-S-G Object)
      if (rVal > 0 || sVal > 0 || gVal > 0) {
        updateTile('solarActivity', { value: { r: rVal, s: sVal, g: gVal }, isLive: true });
      } else {
        updateTile('solarActivity', { value: { r: 3.2, s: 2.1, g: 1.2 }, isLive: false });
      }
    } catch (e) {
      console.warn('NOAA Space Weather API down, using simulation data.', e);
      updateTile('spaceWeather', {
        value: 'NOMINAL (SIM)',
        status: STATUS.NORMAL as StatusKey,
        isLive: false,
      });
      updateTile('solarActivity', { value: { r: 1.5, s: 1.1, g: 0.5 }, isLive: false });
    }
  };

  // Fetch NASA NEO (Near Earth Objects)
  const fetchNEO = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
      );

      const data = await res.json();

      if (!res.ok || (data && data.error)) {
        throw new Error(data?.error?.code || 'API_ERROR');
      }

      if (typeof data.element_count === 'undefined') {
        throw new Error('MALFORMED_DATA');
      }

      const count = data.element_count;
      updateTile('neoThreat', {
        value: `${count} NEAR PASSES`,
        status: (count > 0 ? STATUS.WARNING : STATUS.NORMAL) as StatusKey,
        isLive: true,
      });
    } catch (e) {
      updateTile('neoThreat', {
        value: '15 NEAR PASSES',
        status: STATUS.NORMAL as StatusKey,
        isLive: false,
      });
    }
  };

  // Set static data for satellite count, solar activity, and DSN status
  const setStaticData = useCallback(() => {
    updateTile('satelliteCount', { value: '26,452 TRACKED' });
    updateTile('DSNStatus', { value: '3 ACTIVE', status: STATUS.NORMAL as StatusKey });
  }, [updateTile]);

  const fetchAllData = useCallback(async () => {
    setDashboardState((prev) => ({ ...prev, isLoading: true }));
    // Wait for all fetches to settle or fail
    await Promise.allSettled([fetchISS(), fetchWeather(), fetchNEO()]);
    setStaticData();
    setDashboardState((prev) => ({ ...prev, isLoading: false }));
  }, [setStaticData]);

  // Fetch data once on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { dashboardState, fetchAllData };
}
