import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { authenticate } from '../../services/users/users';
import { AUTHENTICATION_LOCAL_STORAGE_KEY } from '../../constants/authentication-local-storage-key';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../../services/local-storage/local-storage';

export const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

export function AuthenticationProvider(props) {
  const { children } = props;

  const lsAuth = getLocalStorageItem(AUTHENTICATION_LOCAL_STORAGE_KEY);

  const [isLoading, setIsLoading] = useState(false);

  const [expirationDateUtc, setExpirationDateUtc] = useState(
    lsAuth?.expirationDateUtc || ''
  );
  const [id, setId] = useState(lsAuth?.id || '');
  const [roles, setRoles] = useState(lsAuth?.roles || []);
  const [token, setToken] = useState(lsAuth?.token || '');
  const [username, setUsername] = useState(lsAuth?.username || '');

  const resetAuthentication = () => {
    setExpirationDateUtc('');
    setId('');
    setRoles([]);
    setToken('');
    setUsername('');

    removeLocalStorageItem(AUTHENTICATION_LOCAL_STORAGE_KEY);
  };

  const updateAuthentication = (auth) => {
    setExpirationDateUtc(auth.expirationDateUtc);
    setId(auth.id);
    setRoles(auth.roles);
    setToken(auth.token);
    setUsername(auth.username);

    setLocalStorageItem(AUTHENTICATION_LOCAL_STORAGE_KEY, auth);
  };

  const value = useMemo(() => {
    const signIn = async ({
      onFailureCallback,
      onSuccessCallback,
      password,
      username: userNameParam,
    }) => {
      setIsLoading(true);

      try {
        const response = await authenticate({
          username: userNameParam,
          password,
        });

        updateAuthentication(response.data);
        if (onSuccessCallback) onSuccessCallback(response);
      } catch (error) {
        resetAuthentication();
        if (onFailureCallback) onFailureCallback(error);
        // eslint-disable-next-line no-console
        console.error(error);
      }

      setIsLoading(false);
    };

    return {
      expirationDateUtc,
      id,
      isAuthenticated: !!token && moment.utc() < moment.utc(expirationDateUtc),
      isLoading,
      roles,
      signIn,
      token,
      username,
    };
  }, [expirationDateUtc, id, isLoading, roles, token, username]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

AuthenticationProvider.propTypes = {
  children: PropTypes.node,
};

AuthenticationProvider.defaultProps = {
  children: null,
};
