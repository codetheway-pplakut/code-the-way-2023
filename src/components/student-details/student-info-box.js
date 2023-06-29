import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { getStudentById } from '../../services/students/students';
import { EditStudentInfoModal } from './edit-student-info-modal';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [studentFirstName, setFirstName] = useState('');
  const [studentLastName, setLastName] = useState('');
  const [studentCellPhone, setPhone] = useState('');
  const [studentEmail, setEmail] = useState('');

  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      setPhone(student.parentCellPhone);
      setEmail(student.parentEmail);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setPhone(student.studentCellPhone);
      setEmail(student.studentEmail);
    }
  }, [student]); // Run only once on mount

  return (
    <Grid container direction="column" sx={{ my: 2 }}>
      <Grid item>
        <Typography fontSize="35px">
          {`${studentFirstName} ${studentLastName}`}
          <EditStudentInfoModal
            student={student}
            onSaveSuccess={() => onReload()}
            isParent={isParent}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>{studentCellPhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>{studentEmail}</Typography>
      </Grid>
    </Grid>
  );
}

StudentInfoBox.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
  isParent: propTypes.bool,
};
StudentInfoBox.defaultProps = {
  student: undefined,
  onReload: undefined,
  isParent: false,
};
