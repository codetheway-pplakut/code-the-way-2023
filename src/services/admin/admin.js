import { callApi } from '../../utils/call-api/call-api';

/**
 * Gets all Admins stored in DB
 * @returns {[{id:uuid, userName:string, email:email}]} All Admins in DB
 * @author Adam Miller
 */
export const getAdmins = () => callApi({ url: '/Admin' });

/**
 * Gets a specific Admin (same data as getAdmins)
 *
 * @param {uuid} adminId Id of Admin to get
 * @returns {[{id:uuid, userName:string, email:email}]} Admins info
 * @author Adam Miller
 */
export const getAdminById = (adminId) => callApi({ url: `/Admin/${adminId}` });

/**
 * Adds Admin to DB
 *
 * @param {{email:email, password: string, confirmPassword: string}} admin
 * @author Adam Miller
 */
export const addAdmin = (admin) =>
  callApi({
    url: '/Admin/Create',
    method: 'POST',
    data: admin,
  });

/**
 * Deletes an Admin from the DB. SHOULD NOT BE USED
 *
 * @param {uuid} adminId Id of Admin to delete
 * @author Adam Miller
 */
export const deleteAdmin = (adminId) =>
  callApi({
    url: '/Admin',
    method: 'DELETE',
    params: adminId,
  });

/**
 * Activates a deactivated Admin
 * @param {uuid} id
 * @author Adam Miller
 */
export const activateAdmin = (id) =>
  callApi({
    url: '/Admin/Activate',
    method: 'POST',
    data: id,
  });

/**
 * Decativates an active Admin
 * @param {uuid} id
 * @author Adam Miller
 */
export const deactivateAdmin = (id) =>
  callApi({
    url: '/Admin/Deactivate',
    method: 'POST',
    data: id,
  });
