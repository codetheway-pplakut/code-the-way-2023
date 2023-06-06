import { Divider, Drawer, IconButton, Toolbar, List } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ApiIcon from '@mui/icons-material/Api';
import LockIcon from '@mui/icons-material/Lock';
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
        <IconButton onClick={onToggle} sx={{ ml: -2 }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ p: 0 }}>
        <NavigationItem label="Welcome" onClick={onToggle} to="/" />
        <NavigationItem
          label="Sample Screens"
          onClick={onToggle}
          to="/sample-layouts"
        />
        <NavigationItem
          icon={<DashboardIcon />}
          label="Standard Layout"
          onClick={onToggle}
          sx={{ pl: 3 }}
          to="/sample-layouts/standard"
        />
        <NavigationItem
          icon={<BackupTableIcon />}
          label="Tabular Layout"
          onClick={onToggle}
          sx={{ pl: 3 }}
          to="/sample-layouts/tabular"
        />
        <NavigationItem
          icon={<LockIcon />}
          label="Protected Layout"
          onClick={onToggle}
          sx={{ pl: 3 }}
          to="/sample-layouts/protected"
        />
        <NavigationItem
          LinkComponent="a"
          href="https://api-dev-lead2change-ctw.azurewebsites.net/swagger/index.html"
          icon={<ApiIcon />}
          label="Swagger"
          onClick={onToggle}
          sx={{ pl: 3 }}
        />
        <Divider />
        <NavigationItem label="Login" onClick={onToggle} to="/login" />
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
