import axios from 'axios';
import { API_PREFIX } from '../../constants/api-prefix';
import { getLocalStorageItem } from '../../services/local-storage/local-storage';
import { AUTHENTICATION_LOCAL_STORAGE_KEY } from '../../constants/authentication-local-storage-key';

export const callApi = ({
  authenticated = true,
  data,
  method = 'get',
  params = {},
  url,
}) => {
  const { token } = getLocalStorageItem(AUTHENTICATION_LOCAL_STORAGE_KEY);

  return axios.request({
    baseURL: API_PREFIX,
    data,
    headers: { Authorization: authenticated ? token : '' },
    method,
    params,
    url,
  });
};
