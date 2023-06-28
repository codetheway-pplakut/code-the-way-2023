import * as React from 'react';
import { Typography } from '@mui/material';
import StudentDetails from './student-details-page';
import { EditStudentInfoModal } from './edit-student-info-modal';
import { StudentInfoBox } from './student-info-box';

export function StudentInfo() {
  return (
    <div>
      <StudentDetails />
    </div>
  );
}
