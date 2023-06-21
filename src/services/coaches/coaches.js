import { callApi } from '../../utils/call-api/call-api';

/**
 * Gets all coaches in the DB
 * @returns ALl Coaches in DB
 * @author Joey Schroeder
 */
export const getCoaches = () => callApi({ url: '/Coaches' });

/**
 * Gets all data on a coach, including all students (same as getCoaches at the moment. To be deprecated.)
 * @param {uuid} coachId
 * @returns {{id:uuid, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, students:[{}]}}
 * @author Adam Miller
 */
export const getCoachById = (coachId) =>
  callApi({ url: `/Coaches/${coachId}` });
/**
 * Adds a coach to the DB
 * @param {{firstName: string, lastName:string, email:email, phone: string}} coach - Coach to add to DB
 * @author Adam Miller
 */
export const addCoach = (coach) =>
  callApi({
    url: '/Coaches',
    data: coach,
    method: 'POST',
  });

/**
 * Edits a Coach, replacing entry in DB
 *
 * @param {{id:uuid, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, students:[{}]}} coach
 * @author Adam Miller
 */
export const editCoach = (coach) =>
  callApi({
    url: '/Coaches',
    data: coach,
    method: 'PUT',
  });

/**
 * Deletes a coach from the DB. This should not be used, except for cleaning the DB.
 * @param {uuid} coachId
 * @author Adam Miller
 */
export const deleteCoach = (coachId) =>
  callApi({
    url: '/Coaches',
    params: coachId,
    method: 'DELETE',
  });
