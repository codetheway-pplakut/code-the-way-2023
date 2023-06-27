import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { getStudentById } from '../../services/students/students';
import { EditStudentInfoModal } from './edit-student-info-modal';

export function StudentInfoBox(props) {
  const { studentId } = props;
  const [student, setStudent] = useState({});
  const [studentFirstName, setFirstName] = useState('');
  const [studentLastName, setLastName] = useState('');
  const [studentCellPhone, setPhone] = useState('');
  const [studentEmail, setEmail] = useState('');
  useEffect(() => {
    const requestStudent = async () => {
      if (!studentId) return;

      const response = await getStudentById(studentId);
      const { data } = response;

      setStudent(data.student);

      setFirstName(data.student.studentFirstName);
      setLastName(data.student.studentLastName);
      setPhone(data.student.studentCellPhone);
      setEmail(data.student.studentEmail);
    };
    requestStudent();
  }, [student, studentId]);

  return (
    <Grid container>
      <Grid item>
        <Typography fontSize="35px">
          {`${studentFirstName}${studentLastName}`}
          <EditStudentInfoModal studentId={studentId} />
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
