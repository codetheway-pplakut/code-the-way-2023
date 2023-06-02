import { Box } from '@mui/material';
import React from 'react';

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        p: 2,
        textAlign: 'center',
      }}
    >
      Copyright ©{new Date().getFullYear()} · <strong>Code The Way</strong>
    </Box>
  );
}
