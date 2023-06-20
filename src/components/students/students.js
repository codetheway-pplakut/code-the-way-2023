import React from 'react';
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
      <Button>Test</Button>
      <TableLayoutWithRequest
        columns={COLUMNS}
        tableSize="small"
        requestFunc={getStudentsHandler}
        requestLabel="Request Students"
        subTitle="View all students"
        title="Students"
      />
    </div>
  );
}
