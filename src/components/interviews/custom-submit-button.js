import React from 'react';
import { Typography, Box } from '@mui/material';

export function CustomSubmitButton() {
  return (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: '#6DBB7A',
        p: 2,
        textAlign: 'center',
        boxShadow: 2,
      }}
    >
      <Typography sx={{ color: '#ffffff', fontWeight: 'medium' }}>
        Submit Interview
      </Typography>
    </Box>
  );
}
