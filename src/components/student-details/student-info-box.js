import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goal';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CellPhone, setCellPhone] = useState('');
  const [Email, setEmail] = useState('');

  // useEffect gets names again when the student is updated
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
  }, [isParent, student]);

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
export function GoalsBox(props) {
  const { student, onReload } = props;

  const { allGoals, setAllGoals } = useState([]);

  return allGoals.map((goalContent, index) => (
    <Goal goal={goalContent} key={index.id} />
  ));
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
