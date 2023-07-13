import {
  activateAdmin,
  addAdmin,
  deactivateAdmin,
  deleteAdmin,
  getActiveAdmins,
  getAdminById,
  getAllAdmins,
  getInactiveAdmins,
} from '../../services/admin/admin';

/**
 * Gets all Admins stored in DB
 * @returns {[{id:uuid, userName:string, email:email, status:string}]} All Admins in DB
 */
export function getAllAdminsHandler() {
  return getAllAdmins();
}

/**
 * Gets active Admins stored in DB
 * @returns {[{id:uuid, userName:string, email:email, status:string}]} All active Admins in DB
 */
export function getActiveAdminsHandler() {
  return getActiveAdmins();
}

/**
 * Gets inactive Admins stored in DB
 * @returns {[{id:uuid, userName:string, email:email, status:string}]} All inactive Admins in DB
 */
export function getInactiveAdminsHandler() {
  return getInactiveAdmins();
}

/**
 * Gets a specific Admin
 * @param {uuid} id
 * @returns {[{id:uuid, userName:string, email:email, status:string}]} Admins info
 */
export function getAdminByIdHandler(id) {
  return getAdminById(id);
}

/**
 * Creates a new Admin, and associated User
 * @param {email} email
 * @param {string} password
 * @param {string} confirmPassword
 */
export async function addAdminHandler(email, password, confirmPassword) {
  await addAdmin({ email, password, confirmPassword });
}

/**
 * Deletes an Admin from the DB. SHOULD NOT BE USED
 * @param {uuid} id
 */
export function deleteAdminHandler(id) {
  return deleteAdmin(id);
}

/**
 * Activates a deactivated Admin
 * @param {uuid} id
 */
export function activateAdminHandler(id) {
  const data = { id };
  return activateAdmin(data);
}

/**
 * Deactivates an active Admin
 * @param {uuid} id
 */
export function deactivateAdminHandler(id) {
  const data = { id };
  return deactivateAdmin(data);
}
