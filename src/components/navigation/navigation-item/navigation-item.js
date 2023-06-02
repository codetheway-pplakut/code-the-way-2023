import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export function NavigationItem(props) {
  const { icon, label, onClick, to } = props;
  const hasIcon = Boolean(icon);

  return (
    <ListItemButton LinkComponent={RouterLink} onClick={onClick} to={to}>
      {hasIcon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

NavigationItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

NavigationItem.defaultProps = {
  icon: undefined,
  label: undefined,
  onClick: undefined,
  to: undefined,
};
