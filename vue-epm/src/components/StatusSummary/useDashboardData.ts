import { reactive } from 'vue';

import { STATUS, type StatusKey } from '@/constants/statuses';

const dashboardState = reactive({
  satelliteCount: '10,452',
  spaceWeather: {
    label: 'Quiet',
    status: STATUS.NORMAL as StatusKey,
  },
  issEnvironment: {
    label: 'Normal',
    status: STATUS.INFO as StatusKey,
  },
});

export function useDashboardData() {
  const fetchWeather = async () => {
    // Real API implementation later...
    dashboardState.spaceWeather = { label: 'Solar Cycle 25', status: STATUS.NORMAL as StatusKey };
  };

  return { dashboardState, fetchWeather };
}
