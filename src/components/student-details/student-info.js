import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import { Propane } from '@mui/icons-material';
import propTypes from 'prop-types';
import StudentDetails from './student-details-page';
import { EditStudentInfoModal } from './edit-student-info-modal';
import { StudentInfoBox } from './student-info-box';
import { getStudentById } from '../../services/students/students';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';

export function StudentInfo(props) {
  const { studentId } = props;
  const TEST_ID = 'c4f8bbf7-2ad0-4e97-6a3c-08da762785c9';

  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const requestStudent = async (id) => {
    setIsLoading(true);
    const response = await getStudentById(id);
    const { data } = response;

    setStudent(data.student);
    setIsLoading(false);
  };

  useEffect(() => {
    requestStudent(studentId);
  }, [studentId]);

  // Memoize the student details component to prevent unnecessary re-renders
  const memoizedStudentDetails = useMemo(
    () => (
      <StudentDetails
        student={student}
        onReload={() => requestStudent(TEST_ID)}
      />
    ),
    [student]
  );

  return (
    <div>
      <CircularProgressOverlay active={isLoading} />

      {memoizedStudentDetails}
    </div>
  );
}

StudentInfo.propTypes = {
  studentId: propTypes.string,
};

StudentInfo.defaultProps = {
  studentId: 'c4f8bbf7-2ad0-4e97-6a3c-08da762785c9',
};
