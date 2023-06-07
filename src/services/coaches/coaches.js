import { callApi } from '../../utils/call-api/call-api';

export const getCoaches = () => callApi({ url: '/Coaches' });
