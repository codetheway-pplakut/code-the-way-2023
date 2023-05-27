import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';

export function Root() {
  return (
    <CssVarsProvider>
      <div>
        <CssBaseline />
        Test
      </div>
    </CssVarsProvider>
  );
}
