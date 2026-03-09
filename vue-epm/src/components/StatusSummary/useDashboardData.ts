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
      const data = await res.json();
      dashboardState.issEnvironment.value = data.visibility.toUpperCase();
      dashboardState.issEnvironment.status =
        data.visibility === 'daylight'
          ? (STATUS.NORMAL as StatusKey)
          : (STATUS.WARNING as StatusKey);
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch Space Weather (NOAA Kp-Index)
  const fetchWeather = async () => {
    try {
      const res = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');
      const data = await res.json();

      // R, S, G scales come from data['0'] usually
      const rVal = parseInt(data['0'].r) || 0;
      const sVal = parseInt(data['0'].s) || 0;
      const gVal = parseInt(data['0'].g) || 0;

      // Update Space Weather (Textual)
      const geoStormLevel = GEO_STORM_LEVELS[gVal];
      dashboardState.spaceWeather.value = geoStormLevel?.label || 'QUIET';
      dashboardState.spaceWeather.status = geoStormLevel?.status as StatusKey;

      // Update Solar Activity (R-S-G Object)
      //dashboardState.solarActivity.value = { r: rVal, s: sVal, g: gVal };
      // Simulated values for demonstration
      dashboardState.solarActivity.value = { r: 3.2, s: 2.1, g: 1.2 };
      console.log('Fetched Space Weather:', { r: rVal, s: sVal, g: gVal });
    } catch (e) {
      console.error(e);
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
      const count = data.element_count;
      dashboardState.neoThreat.value = `${count} NEAR PASSES`;
      dashboardState.neoThreat.status =
        count > 0 ? (STATUS.WARNING as StatusKey) : (STATUS.NORMAL as StatusKey);
    } catch (e) {
      console.error(e);
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
