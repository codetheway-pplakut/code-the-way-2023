import * as React from 'react';
import { Typography } from '@mui/material';
import StudentDetails from './student-details-page';

export function StudentInfo() {
  return (
    <div>
      <Typography p="20px" variant="h2" mx="10px" mt="5px">
        Student Information
      </Typography>
      <StudentDetails />
    </div>
  );
}
