import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ROUTER } from './constants/router';
import { AuthenticationProvider } from './contexts/authentication-context/authentication-context';

const theme = createTheme();
const root = createRoot(document.getElementById('app'));

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <CssBaseline />
    <AuthenticationProvider>
      <RouterProvider router={ROUTER} />
    </AuthenticationProvider>
  </ThemeProvider>
);
