import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';
import { RESTRICTED_ROLES } from '../../constants/restricted-roles';

export function RestrictedRestricted(props) {
  const { children, requiredRoles } = props;

  const authentication = useAuthentication();
  const location = useLocation();

  const { isAuthenticated, roles } = authentication;

  if (!isAuthenticated || roles.some((role) => !requiredRoles.includes(role))) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RestrictedRestricted.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

RestrictedRestricted.defaultProps = {
  children: null,
  requiredRoles: [RESTRICTED_ROLES.ADMIN, RESTRICTED_ROLES.COACH],
};
