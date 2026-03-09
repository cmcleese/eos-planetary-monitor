import { reactive, type Component, markRaw } from 'vue';

import { STATUS, type StatusKey } from '@/constants/statuses';
import { GEO_STORM_LEVELS } from '@/constants/space-weather';
import RsgDisplay from '@/components/StatusSummary/RsgDisplay.vue';

export interface DashboardTile {
  name: string;
  tooltip: string;
  value?: string | number | Record<string, string | number>;
  status: StatusKey;
  component?: Component | null;
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

const dashboardState = reactive<DashboardState>({
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
    component: markRaw(RsgDisplay),
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
});

export function useDashboardData() {
  // Fetch ISS environment (Real-time)
  const fetchISS = async () => {
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (!res.ok) throw new Error('API_UNAVAILABLE');
      const data = await res.json();
      dashboardState.issEnvironment.value = data.visibility.toUpperCase();
      dashboardState.issEnvironment.status =
        data.visibility === 'daylight'
          ? (STATUS.NORMAL as StatusKey)
          : (STATUS.WARNING as StatusKey);
      dashboardState.issEnvironment.isLive = true;
    } catch (e) {
      console.warn('ISS connection lost, using nominal fallback.', e);
      dashboardState.issEnvironment.value = 'STABLE (SIM)';
      dashboardState.issEnvironment.status = STATUS.NORMAL as StatusKey;
      dashboardState.issEnvironment.isLive = false;
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
      dashboardState.spaceWeather.value = geoStormLevel?.label || 'QUIET';
      dashboardState.spaceWeather.status = geoStormLevel?.status as StatusKey;

      // Update Solar Activity (R-S-G Object)
      if (rVal > 0 || sVal > 0 || gVal > 0) {
        dashboardState.solarActivity.value = { r: rVal, s: sVal, g: gVal };
        dashboardState.solarActivity.isLive = true;
        dashboardState.spaceWeather.isLive = true;
      } else {
        dashboardState.solarActivity.value = { r: 3.2, s: 2.1, g: 1.2 };
        dashboardState.solarActivity.isLive = false;
        dashboardState.spaceWeather.isLive = false;
      }
    } catch (e) {
      console.warn('NOAA Space Weather API down, using simulation data.', e);
      dashboardState.spaceWeather.value = 'NOMINAL (SIM)';
      dashboardState.spaceWeather.status = STATUS.NORMAL as StatusKey;
      dashboardState.spaceWeather.isLive = false;
      dashboardState.solarActivity.value = { r: 1.5, s: 1.1, g: 0.5 };
      dashboardState.solarActivity.isLive = false;
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

      // Specifically checking for the error structure provided: { error: { code: "...", message: "..." } }
      if (!res.ok || (data && data.error)) {
        const errorType = data?.error?.code || 'API_ERROR';
        console.warn(`NASA [${errorType}] detected. Engaging orbital prediction fallback.`);
        throw new Error(errorType);
      }

      if (typeof data.element_count === 'undefined') {
        throw new Error('MALFORMED_DATA');
      }

      const count = data.element_count;
      dashboardState.neoThreat.value = `${count} NEAR PASSES`;
      dashboardState.neoThreat.status =
        count > 0 ? (STATUS.WARNING as StatusKey) : (STATUS.NORMAL as StatusKey);
      dashboardState.neoThreat.isLive = true;
    } catch (e) {
      // Fallback to a nominal value if API is unavailable or rate-limited
      dashboardState.neoThreat.value = '15 NEAR PASSES';
      dashboardState.neoThreat.status = STATUS.NORMAL as StatusKey;
      dashboardState.neoThreat.isLive = false;
    }
  };

  // Set static data for satellite count, solar activity, and DSN status
  const setStaticData = () => {
    // Satellite count (simulated)
    dashboardState.satelliteCount.value = '26,452 TRACKED';
    // DSN status (simulated)
    dashboardState.DSNStatus.value = '3 ACTIVE';
    dashboardState.DSNStatus.status = STATUS.NORMAL as StatusKey;
  };

  async function fetchAllData() {
    dashboardState.isLoading = true;
    await Promise.all([fetchISS(), fetchWeather(), fetchNEO()]);
    setStaticData();
    dashboardState.isLoading = false;
  }

  return { dashboardState, fetchAllData };
}
