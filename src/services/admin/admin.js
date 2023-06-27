import { callApi } from '../../utils/call-api/call-api';

/**
 * Gets all Admins stored in DB
 *
 * @returns {[{id:uuid, userName:string, email:email, status:string}]} All Admins in DB
 * @author Adam Miller
 */
export const getAllAdmins = () => callApi({ url: '/Admin/' });

/**
 * Gets active Admins stored in DB
 *
 * @returns {[{id:uuid, userName:string, email:email, status:string}]}
 * @author Adam Miller
 */
export const getActiveAdmins = () => callApi({ url: '/Admin/GetActiveAdmins' });

/**
 * Gets inactive Admins stored in DB
 *
 * @returns {[{id:uuid, userName:string, email:email, status:string}]}
 * @author Adam Miller
 */
export const getInactiveAdmins = () =>
  callApi({ url: '/Admin/GetInactiveAdmins' });

/**
 * Gets a specific Admin
 *
 * @param {uuid} adminId Id of Admin to get
 * @returns {[{id:uuid, userName:string, email:email,status:string}]} Admins info
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
 * @param {UUID} adminId Id of Admin to delete
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
 * @param {{id:UUID}} adminId
 * @author Adam Miller
 */
export const activateAdmin = (adminId) =>
  callApi({
    url: '/Admin/Activate',
    method: 'POST',
    data: adminId,
  });

/**
 * Decativates an active Admin
 * @param {{id:UUID}} adminId
 * @author Adam Miller
 */
export const deactivateAdmin = (adminId) =>
  callApi({
    url: '/Admin/Deactivate',
    method: 'POST',
    data: adminId,
  });
