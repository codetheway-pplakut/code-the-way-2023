import { Divider, Drawer, IconButton, Toolbar, List } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ApiIcon from '@mui/icons-material/Api';
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
        <NavigationItem label="Admins" onClick={onToggle} to="/admins" />
        <NavigationItem label="Coaches" onClick={onToggle} to="/coaches" />
        <NavigationItem label="Goals" onClick={onToggle} to="/goals" />
        <NavigationItem label="Students" onClick={onToggle} to="/students" />
        <NavigationItem
          label="Inactive/Rejected"
          onClick={onToggle}
          to="/inactive-rejected"
        />
        <NavigationItem
          LinkComponent="a"
          href="https://api-dev-lead2change-ctw.azurewebsites.net/swagger/index.html"
          icon={<ApiIcon />}
          label="Swagger"
          onClick={onToggle}
          sx={{ pl: 3 }}
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
