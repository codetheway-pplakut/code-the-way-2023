import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { setStudentActive } from '../../../services/students/students';

export function StudentActivateButton(props) {
  const { studentId, onStudentActivate } = props;

  const disabled = !studentId;

  const activateStudent = async () => {
    await setStudentActive(studentId);
    if (onStudentActivate) onStudentActivate();
  };

  return (
    <Button variant="contained" onClick={activateStudent} disabled={disabled}>
      Activate
    </Button>
  );
}

StudentActivateButton.propTypes = {
  onStudentActivate: PropTypes.func,
  studentId: PropTypes.string.isRequired,
};

StudentActivateButton.defaultProps = {
  onStudentActivate: undefined,
};
