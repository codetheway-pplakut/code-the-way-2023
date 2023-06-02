import {
  IconButton,
  AppBar as MaterialAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

export function AppBar(props) {
  const { onNavigationClick, title } = props;

  return (
    <MaterialAppBar position="relative">
      <Toolbar>
        <IconButton color="inherit" onClick={onNavigationClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
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
