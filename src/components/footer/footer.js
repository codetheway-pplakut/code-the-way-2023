import { Box, Container } from '@mui/material';
import React from 'react';

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.200',
        p: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'right' }}>
        Copyright ©{new Date().getFullYear()} · <strong>Code The Way</strong>
      </Container>
    </Box>
  );
}
