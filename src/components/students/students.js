import React from 'react';
import { Button, Modal, Box, Grid, Typography, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { Layout } from '../layout/layout';
import { Button } from '@mui/material';
import {
  addStudent,
  assignStudent,
  deleteStudent,
  editStudent,
  getStudents,
  unassignStudent,
} from '../../services/students/students';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';

/**
 * Gets list of all students
 * @returns Gets all students in DB
 * @author Adam Miller
 */
export function getStudentsHandler() {
  return getStudents();
}

/**
 * Gets all data stored in DB of specific student
 * @param {uuid} studentId
 * @returns All Data of Student
 * @author Adam Miller
 */
export function getStudentByIdHandler(studentId) {
  return getStudentByIdHandler(studentId);
}
/**
 * Function to call API to add student.
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {Date} dateOfBirth
 * @param {string} cellPhone
 * @author Adam Miller
 *
 */
export function addStudentHandler(
  firstName,
  lastName,
  email,
  dateOfBirth,
  cellPhone
) {
  const data = { firstName, lastName, email, dateOfBirth, cellPhone };
  addStudent(data);
}

/**
 * Replaces the student's database entry with the updated one.
 * @param {Student} student Whole student object
 * @author Adam Miller
 */
export function editStudentHandler(student) {
  editStudent(student);
}
/**
 * Function to call API to delete student. This should not be used - We want to deactivate students instead.
 * @param {uuid} studentId - Id of student to delete
 * @author Adam Miller
 */
export function deleteStudentHandler(studentId) {
  const params = { id: studentId };
  deleteStudent(params);
}

/**
 * Function to call services to call to API to assign a Student to a coach
 * @param {uuid} studentId
 * @param {uuid} coachId
 * @author Adam Miller
 */
export function assignStudentHandler(studentId, coachId) {
  assignStudent(studentId, coachId);
}

/**
 * Function to call services to call to API to unassign a Student from a coach
 * @param {uuid} studentId
 * @param {uuid} coachId
 * @author Adam Miller
 */
export function unassignStudentHandler(studentId, coachId) {
  unassignStudent(studentId, coachId);
}

export function Students() {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  // eslint-disable-next-line prettier/prettier
  const num = /\d/;
  const [text, setText] = React.useState('');
  const [text1, setText1] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  // const showErrorMessage = Boolean(errorMessage);
  // const textBool =
  //   text1.length < 6 ||
  //   text.length < 6 ||
  //   text.includes(' ') ||
  //   text1.includes(' ') ||
  //   !text.includes('@') ||
  //   !text.includes('.') ||
  //   !specialChars.test(text1) ||
  //   !num.test(text1);
  const clearText = () => {
    setText('');
    setText1('');
  };
  const submitHandler = () => {
    if (text1.length === 0 || text.length === 0) {
      setErrorMessage('Please fill out all fields');
      setError(true);
    } else if (text1.length < 6 || text.length < 6) {
      setErrorMessage('Username or password must be at least 6 characters');
      setError(true);
    } else if (text.includes(' ') || text1.includes(' ')) {
      setErrorMessage('Username and password cannot have spaces');
      setError(true);
    } else if (!text.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setError(true);
    } else if (!text.includes('.')) {
      setErrorMessage('Please enter a valid email');
      setError(true);
    } else if (!specialChars.test(text1)) {
      setErrorMessage('Password must include a special character');
      setError(true);
    } else if (!num.test(text1)) {
      setErrorMessage('Password must include a number');
      setError(true);
    } else {
      setErrorMessage('');
      setError(false);
      setOpen(false);
      console.log(text);
      console.log(text1);
      clearText();
    }
  };
  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
    setError(false);
    clearText();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Layout
      actions={[
        <Button
          variant="contained"
          key="1"
          color="success"
          onClick={handleOpen}
        >
          Button
        </Button>,
      ]}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          alignItems="center"
          sx={{
            position: 'absolute',
            bgcolor: '#004CBB',
            top: '30%',
            left: '43%',
            width: 430,
            height: 530,
            color: 'white',
          }}
        >
          <Grid container direction="column">
            <Grid item align="center" sx={{ pt: 4 }}>
              <TextField
                error={error}
                size="small"
                id="filled-basic"
                // color="success"
                variant="outlined"
                label="Username"
                sx={{ color: 'white' }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </Grid>
            <Grid item align="center" sx={{ pt: 4 }}>
              <TextField
                error={error}
                size="small"
                id="filled-basic"
                // color="success"
                variant="outlined"
                label="Password"
                sx={{ color: 'white' }}
                onChange={(e) => {
                  setText1(e.target.value);
                }}
              />
            </Grid>
            <Grid item align="center" sx={{ pt: 4 }}>
              <Typography sx={{ color: pink[500] }}> {errorMessage}</Typography>
            </Grid>
            <Grid item align="center" sx={{ pt: 8 }}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={7}>
                  <Button variant="contained" onClick={submitHandler}>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Layout>
  );
}
