import React, { useState } from 'react';
import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';
import { AppBar } from '../app-bar/app-bar';

export function App() {
  const [navigationActive, setNavigationActive] = useState(false);
  const toggleNavigation = () => setNavigationActive(!navigationActive);

  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <AppBar title="Code The Way" onNavigationClick={toggleNavigation} />
      <Navigation active={navigationActive} onToggle={toggleNavigation} />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
