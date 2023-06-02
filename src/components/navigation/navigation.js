import {
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  List,
  ListItemText,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';

export function Navigation(props) {
  const { active, onToggle } = props;

  return (
    <Drawer open={active} anchor="left" onClose={onToggle}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Detail View" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Tabular View" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
}

Navigation.propTypes = {
  active: PropTypes.bool,
  onToggle: PropTypes.func,
};

Navigation.defaultProps = {
  active: false,
  onToggle: undefined,
};
