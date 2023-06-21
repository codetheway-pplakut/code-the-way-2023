import { callApi } from '../../utils/call-api/call-api';

export const getGoals = () => callApi({ url: '/Goals' });
