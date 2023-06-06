import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthentication } from '../../../contexts/authentication-context/authentication-context';

export function AppBarProfile() {
  const [anchorElement, setAnchorElement] = useState(null);

  const authentication = useAuthentication();
  const { isAuthenticated, username, signOut } = authentication;

  if (!isAuthenticated) return null;

  const menuOpen = Boolean(anchorElement);
  const handleOnMenuClick = (event) => setAnchorElement(event.currentTarget);
  const handleOnClose = () => setAnchorElement(null);

  const handleOnSignOutClick = () => {
    handleOnClose();
    signOut();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography color="inherit" sx={{ mr: 1 }}>
        {username}
      </Typography>
      <IconButton size="large" onClick={handleOnMenuClick} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        onClose={handleOnClose}
        open={menuOpen}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleOnSignOutClick}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
}
