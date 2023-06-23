import React from 'react';
import {
  Button,
  Grid,
  Link,
  TextField,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

import { getStudents } from '../../services/students/students';
import { TableLayout } from '../table-layout/table-layout';
import { Todal } from '../test/modal';
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

import {
  ArchiveStudentModal,
  ChooseCoachModal,
} from '../coaches/modal-component';

const COLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
    render: (value) => <Button>{value}</Button>,
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
  },
  {
    id: 'studentCellPhone',
    disablePadding: false,
    label: 'Student Cell',
    align: 'left',
    active: false,
  },
  {
    id: 'options',
    disablePadding: false,
    label: '',
    align: 'left',
    render: () => (
      <React.Fragment>
        <ArchiveStudentModal /> <ChooseCoachModal />
      </React.Fragment>
    ),
    active: false,
  },
];
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
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <TableLayout
            columns={COLUMNS}
            requestFunc={getStudents}
            title="Students"
            subTitle="View all students"
            useTab
            tabNames={['active', 'applicant']}
          />
        </Grid>
      </Grid>
    </div>
  );
}
