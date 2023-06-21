import { Box } from '@mui/material';
import React from 'react';

export default function CommunicationBox() {
  const boxStyle = {
    position: 'relative',
    bgcolor: '#ff7c00',
    height: '10%',
    width: '43vw',

    display: 'flex',
    alignItems: 'center', // Vertically center the content
    flexShrink: 1,
    gridColumn: '1 / -1',
  };

  return <Box sx={boxStyle}> Communication</Box>;
}
