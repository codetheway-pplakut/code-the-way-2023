import React from 'react';
import {
  addCoach,
  getCoachById,
  getCoaches,
} from '../../services/coaches/coaches';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { editStudent } from '../../services/students/students';

const COLUMNS = [
  {
    headerName: 'ID',
    field: 'id',
    width: 300,
  },
  {
    headerName: 'First Name',
    field: 'coachFirstName',
    width: 100,
  },
  {
    headerName: 'Last Name',
    field: 'coachLastName',
    width: 100,
  },
  {
    headerName: 'Email',
    field: 'coachEmail',
    width: 300,
  },
];

/**
 * Returns all coaches in the DB
 * @returns All Coaches
 * @author Adam Miller
 */
export function getCoachesHandler() {
  return getCoaches();
}

/**
 * Gets all info from the DB.
 *
 * @param {uuid} coachId Coach to get info on.
 * @returns {{id:uuid, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, students:[{}]}}
 * @author Adam Miller
 */
export function getCoachByIdHandler(coachId) {
  return getCoachById(coachId);
}

/**
 * Adds a Coach to the DB
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {email} email
 * @param {string} phone
 * @author Adam Miller
 */
export function addCoachHandler(firstName, lastName, email, phone) {
  const data = { firstName, lastName, email, phone };
  addCoach(data);
}

/**
 * Edits a coach, replacing the whole DB entry.
 *
 * @param {Coach} coach Whole coach object, including students, to change.
 * @author Adam Miller
 */
export function editCoachHandler(coach) {
  editStudent(coach);
}

/**
 * Deletes a coach from the DB. THIS SHOULD NOT BE USED.
 *
 * @param {uuid} coachId
 * @author Adam Miller
 */
export function deleteCoach(coachId) {
  deleteCoach(coachId);
}

export function Coaches() {
  return (
    <TableLayoutWithRequest
      columns={COLUMNS}
      requestFunc={getCoaches}
      requestLabel="Request Coaches"
      subTitle="View all coaches"
      title="Coaches"
    />
  );
}
