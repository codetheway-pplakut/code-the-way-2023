import { callApi } from '../../utils/call-api/call-api';

export const getStudents = () => callApi({ url: '/Students' });
