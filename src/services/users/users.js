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

// This is for initiating the password reset process.
export const requestPasswordReset = (data) => {
  return callApi({
    url: '/users/request-password-reset',
    method: 'post',
    data,
  });
};

// This is for changing the password.
export const resetPassword = (data) => {
  return callApi({
    url: '/users/reset-password',
    method: 'post',
    data,
  });
};
