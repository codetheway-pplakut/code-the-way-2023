import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { getStudentById } from '../../services/students/students';
import { EditStudentInfoModal } from './edit-student-info-modal';

export function StudentInfoBox(props) {
  const { studentId, isParent } = props;
  const [student, setStudent] = useState({});
  const [studentFirstName, setFirstName] = useState('');
  const [studentLastName, setLastName] = useState('');
  const [studentCellPhone, setPhone] = useState('');
  const [studentEmail, setEmail] = useState('');

  const requestStudent = async (id) => {
    if (!id) return;

    const response = await getStudentById(id);
    const { data } = response;

    setStudent(data.student);
    if (isParent) {
      setFirstName(data.student.parentFirstName);
      setLastName(data.student.parentLastName);
      setPhone(data.student.parentCellPhone);
      setEmail(data.student.parentEmail);
    } else {
      setFirstName(data.student.studentFirstName);
      setLastName(data.student.studentLastName);
      setPhone(data.student.studentCellPhone);
      setEmail(data.student.studentEmail);
    }
  };

  useEffect(() => {
    requestStudent(studentId);
  }, [studentId]);

  return (
    <Grid container direction="column" sx={{ my: 2 }}>
      <Grid item>
        <Typography fontSize="35px">
          {`${studentFirstName} ${studentLastName}`}
          <EditStudentInfoModal
            studentId={studentId}
            onSaveSuccess={() => requestStudent(studentId)}
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
  studentId: propTypes.string,
};
StudentInfoBox.defaultProps = {
  studentId: '',
};
