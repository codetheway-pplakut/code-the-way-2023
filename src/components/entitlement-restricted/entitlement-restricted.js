import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';
import { ENTITLEMENT_ROLES } from '../../constants/entitlement-roles';

export function EntitlementRestricted(props) {
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

EntitlementRestricted.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

EntitlementRestricted.defaultProps = {
  children: null,
  requiredRoles: [ENTITLEMENT_ROLES.ADMIN, ENTITLEMENT_ROLES.COACH],
};
