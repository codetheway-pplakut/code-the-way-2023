import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import EditStudentInfoModal from './edit-student-info-modal';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CellPhone, setCellPhone] = useState('');
  const [Email, setEmail] = useState('');

  // useEffect(() => {
  //   setStudentFirstName(student.studentFirstName);
  //   setStudentLastName(student.studentLastName);
  //   setStudentCellPhone(student.studentCellPhone);
  //   setStudentEmail(student.studentEmail);
  //   setParentFirstName(student.parentFirstName);
  //   setParentLastName(student.parentLastName);
  //   setParentCellPhone(student.parentCellPhone);
  //   setParentEmail(student.parentEmail);
  // }, [student]); // Run only once on mount

  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      setCellPhone(student.parentCellPhone);
      setEmail(student.parentEmail);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setCellPhone(student.studentCellPhone);
      setEmail(student.studentEmail);
    }
  }, [student]);

  return (
    <Grid container direction="column" sx={{ my: 2 }}>
      <Grid item>
        <Typography fontSize="35px">
          {`${FirstName} ${LastName}`}
          <EditStudentInfoModal
            student={student}
            onSaveSuccess={() => onReload()}
            isParent={isParent}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Cell: {CellPhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>Email: {Email}</Typography>
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
