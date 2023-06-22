import React from 'react';
import { Grid } from '@mui/material';
import Table2 from './table';
import {
  ArchiveCoachModal,
  GenericModal,
  AddCoachModal,
} from './modal-component';
import {
  addCoach,
  getCoachById,
  getCoaches,
} from '../../services/coaches/coaches';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { editStudent } from '../../services/students/students';

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
 * @returns {{id:uuid, userId:string, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, active:boolean}}
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
 * @param {string} password
 * @param {string} confirmPassword
 *
 * @author Adam Miller
 */
export function addCoachHandler(
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword
) {
  const data = { firstName, lastName, email, phone, password, confirmPassword };
  addCoach(data);
}

/**
 * Edits a coach, replacing the whole DB entry.
 *
 * @param {{id:uuid, userId:string, coachFirstName:string, coachLastName:string, coachEmail:string, coachPhoneNumber: string, active:boolean}} coach Whole coach object, including students, to change.
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
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Table2 />
        </Grid>
      </Grid>

      <AddCoachModal />
      <ArchiveCoachModal />
    </div>
  );
}
