import axios from 'axios';
import { API_PREFIX } from '../../constants/api-prefix';

export const authenticate = ({ username, password }) => {
  if (!username || !password)
    throw new Error('Username and password are required.');

  return axios.post(`${API_PREFIX}/Users/authenticate`, {
    username,
    password,
  });
};
