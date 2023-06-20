import * as React from 'react';
import { Typography } from '@mui/material';
import RowAndColumnSpacing from './rowSpacing';

export function StudentInfo() {
  return (
    <div>
      <Typography variant="h2">John Doe</Typography>
      <Typography variant="h4">Student Info</Typography>
      <RowAndColumnSpacing />
    </div>
  );
}
