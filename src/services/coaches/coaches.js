import { callApi } from '../../utils/call-api/call-api';

/**
 * Gets all coaches in the DB
 * @returns ALl Coaches in DB
 * @author Adam Miller
 */
export const getAllCoaches = () => callApi({ url: '/Coaches/' });

/**
 * Gets all inactive coaches.
 *
 * @returns All inactive coaches in the DB
 * @author Adam Miller
 */
export const getActiveCoaches = () =>
  callApi({ url: '/Coaches/GetActiveCoaches' });

/**
 * Gets all inactive coaches.
 *
 * @returns All inactive coaches in the DB
 * @author Adam Miller
 */
export const getInactiveCoaches = () =>
  callApi({ url: '/Coaches/GetInactiveCoaches' });

/**
 * Gets all data on a coach, including all students (same as getCoaches at the moment. To be deprecated.)
 * @param {uuid} coachId
 * @returns {{id:uuid, userId:string, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, active:boolean}}
 * @author Adam Miller
 */
export const getCoachById = (coachId) =>
  callApi({ url: `/Coaches/${coachId}` });
/**
 * Adds a coach to the DB
 * @param {{firstName: string, lastName:string, email:email, phone: string, password, confirmPassword}} coach - Coach to add to DB
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
 * @param {{id:uuid, userId:string, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, active:boolean}} coach
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

/**
 * Activates a coach in the DB
 * @param {{id:uuid,userName:email,email:email, status:string}} data
 * @author Adam Miller
 */
export const activateCoach = (data) =>
  callApi({
    url: '/Coaches/ActivateCoach',
    data,
    method: 'POST',
  });

/**
 * Deactivates a coach in the DB
 * @param {{id:uuid,userName:email,email:email, status:string}} data
 * @author Adam Miller
 */
export const deactivateCoach = (data) =>
  callApi({
    url: '/Coaches/DeactivateCoach',
    data,
    method: 'POST',
  });
