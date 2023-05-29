import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

export function App() {
  return (
    <CssVarsProvider>
      <GlobalStyles />
      <CssBaseline />
      <Box>Test</Box>
    </CssVarsProvider>
  );
}
