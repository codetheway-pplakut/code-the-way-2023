import * as React from 'react';
import { Typography } from '@mui/material';
import StudentDetails from './student-details-page';
import { EditStudentInfoModal } from './edit-student-info-modal';
import { StudentInfoBox } from './student-info-box';

export function StudentInfo() {
  const TEST_ID = 'c4f8bbf7-2ad0-4e97-6a3c-08da762785c9';
  return (
    <div>
      <StudentInfoBox studentId={TEST_ID} />
      <StudentDetails />
    </div>
  );
}
