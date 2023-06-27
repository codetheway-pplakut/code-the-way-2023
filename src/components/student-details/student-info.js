import * as React from 'react';
import { Typography } from '@mui/material';
import StudentDetails from './student-details-page';
import { EditStudentInfoModal } from './edit-student-info-modal';

export function StudentInfo() {
  return (
    <div>
      <EditStudentInfoModal />
      <StudentDetails />
    </div>
  );
}
