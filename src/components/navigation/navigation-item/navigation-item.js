import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export function NavigationItem(props) {
  const { href, icon, label, onClick, sx, to, LinkComponent } = props;
  const hasIcon = Boolean(icon);

  return (
    <ListItemButton
      LinkComponent={LinkComponent}
      href={href}
      onClick={onClick}
      sx={sx}
      to={to}
    >
      {hasIcon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

NavigationItem.propTypes = {
  LinkComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  href: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  to: PropTypes.string,
};

NavigationItem.defaultProps = {
  LinkComponent: RouterLink,
  href: undefined,
  icon: undefined,
  label: undefined,
  onClick: undefined,
  sx: undefined,
  to: undefined,
};
