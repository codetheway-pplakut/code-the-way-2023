import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { authenticate } from '../../services/users/users';

export const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

export function AuthenticationProvider(props) {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [expirationDateUtc, setExpirationDateUtc] = useState('');
  const [id, setId] = useState('');
  const [roles, setRoles] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const resetUser = () => {
    setExpirationDateUtc('');
    setId('');
    setRoles([]);
    setToken('');
    setUsername('');
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

        setId(response.data.id);
        setUsername(response.data.username);
        setToken(response.data.token);
        setRoles(response.data.roles);
        setExpirationDateUtc(response.data.expirationDateUtc);

        if (onSuccessCallback) onSuccessCallback(response);
      } catch (error) {
        resetUser();
        if (onFailureCallback) onFailureCallback(error);
        // eslint-disable-next-line no-console
        console.error(error);
      }

      setIsLoading(false);
    };

    return {
      expirationDateUtc,
      id,
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
