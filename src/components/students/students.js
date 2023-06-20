import React from 'react';
import { Button } from '@mui/material';
import {
  addStudent,
  deleteStudent,
  getStudents,
} from '../../services/students/students';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';

const COLUMNS = [
  {
    headerName: 'ID',
    field: 'id',
  },
  {
    headerName: 'First Name',
    field: 'firstName',
  },
  {
    headerName: 'Last Name',
    field: 'lastName',
  },
  {
    headerName: 'Email',
    field: 'email',
  },
  {
    headerName: 'State',
    field: 'state',
  },
  {
    headerName: 'Parent First Name',
    field: 'parentFirstName',
  },
  {
    headerName: 'Parent Last Name',
    field: 'parentLastName',
  },
];

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
 * Function to call API to delete student. This should not be used - We want to deactivate students instead.
 * @param {uuid} studentId - Id of student to delete
 * @author Adam Miller
 */
export function deleteStudentHandler(studentId) {
  const params = { id: studentId };
  deleteStudent(params);
}

export function Students() {
  return (
    <div>
      <Button>Test</Button>
      <TableLayoutWithRequest
        columns={COLUMNS}
        tableSize="small"
        requestFunc={getStudents}
        requestLabel="Request Students"
        subTitle="View all students"
        title="Students"
      />
    </div>
  );
}
