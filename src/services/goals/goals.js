import { callApi } from '../../utils/call-api/call-api';

export const getGoals = () => callApi({ url: '/Goals' });
export const addGoal = (goal) =>
  callApi({ url: '/Goals', data: goal, method: 'POST' });
