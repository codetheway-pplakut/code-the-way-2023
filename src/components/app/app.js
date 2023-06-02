import React, { useState } from 'react';
import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';
import { AppBar } from '../app-bar/app-bar';
import { Footer } from '../footer/footer';

export function App() {
  const [navigationActive, setNavigationActive] = useState(false);
  const toggleNavigation = () => setNavigationActive(!navigationActive);

  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <AppBar title="Code The Way" onNavigationClick={toggleNavigation} />
      <Navigation active={navigationActive} onToggle={toggleNavigation} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
