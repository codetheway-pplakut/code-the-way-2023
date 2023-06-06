import { callApi } from '../../utils/call-api/call-api';

export const authenticate = ({ username, password }) => {
  if (!username || !password)
    throw new Error('Username and password are required.');

  return callApi({
    url: '/Users/authenticate',
    method: 'post',
    data: { username, password },
    authenticated: false,
  });
};
