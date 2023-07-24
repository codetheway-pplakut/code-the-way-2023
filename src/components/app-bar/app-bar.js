import {
  IconButton,
  AppBar as MaterialAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { AppBarProfile } from './app-bar-profile/app-bar-profile';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';

export function AppBar(props) {
  const { onNavigationClick, title } = props;

  const authentication = useAuthentication();
  const { username } = authentication;
  if (username)
    return (
      <MaterialAppBar position="relative">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onNavigationClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <AppBarProfile />
        </Toolbar>
      </MaterialAppBar>
    );
  return (
    <MaterialAppBar position="relative">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <AppBarProfile />
      </Toolbar>
    </MaterialAppBar>
  );
}

AppBar.propTypes = {
  onNavigationClick: PropTypes.func,
  title: PropTypes.string,
};

AppBar.defaultProps = {
  onNavigationClick: undefined,
  title: undefined,
};
