import { Divider, Drawer, IconButton, Toolbar, List } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavigationItem } from './navigation-item/navigation-item';

const DRAWER_WIDTH = '320px';

export function Navigation(props) {
  const { active, onToggle } = props;

  return (
    <Drawer
      open={active}
      anchor="left"
      onClose={onToggle}
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <IconButton onClick={onToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <NavigationItem
          icon={<DashboardIcon />}
          label="Splash"
          onClick={onToggle}
          to="/splash"
        />
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
