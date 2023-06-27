import {
  getActiveStudents,
  getInactiveStudents,
  getAppliedStudents,
  getRejectedStudents,
  getStudentsByCoachId,
  getStudentById,
  addStudent,
  editStudent,
  deleteStudent,
  assignStudent,
  unassignStudent,
} from '../../services/students/students';

/**
 * Returns active students
 * @returns Gets all active students
 * @author Holly Raetz
 */
export function getActiveStudentsHandler() {
  return getActiveStudents();
}

/**
 * Returns inactive students
 * @returns Gets all inactive students
 * @author Holly Raetz
 */
export function getInactiveStudentsHandler() {
  return getInactiveStudents();
}

/**
 * Returns applied students
 * @returns Gets all applied students
 * @author Holly Raetz
 */
export function getAppliedStudentsHandler() {
  return getAppliedStudents();
}

/**
 * Returns rejected students
 * @returns Gets all rejected students
 * @author Holly Raetz
 */
export function getRejectedStudentsHandler() {
  return getRejectedStudents();
}

/**
 * Gets students assigned to a coach
 * @param {uuid} coachId
 * @returns All students assigned to given coach
 * @author Holly Raetz
 */
export function getStudentsByCoachIdHandler(coachId) {
  return getStudentsByCoachId(coachId);
}

/**
 * Gets a student using their id
 * @param {uuid} id
 * @returns Student with the given id
 * @author Holly Raetz
 */
export function getStudentByIdHandler(id) {
  return getStudentById(id);
}

/**
 * Add a student
 * @param {string} firstName
 * @param {string} lastName
 * @param {Date} dateOfBirth
 * @param {string} cellPhone
 * @param {email} email
 * @returns Adds a student
 * @author Holly Raetz
 */
export function addStudentHandler(
  firstName,
  lastName,
  dateOfBirth,
  cellPhone,
  email
) {
  const data = { firstName, lastName, dateOfBirth, cellPhone, email };
  return addStudent(data);
}

/**
 * Edit a student
 * @param {student} student
 * @returns Edits the student
 * @author Holly Raetz
 */
export function editStudentHandler(student) {
  return editStudent(student);
}

/**
 * Delete a student
 * @param {uuid} id
 * @returns Deletes the student
 * @author Holly Raetz
 */
export function deleteStudentHandler(id) {
  return deleteStudent(id);
}

/**
 * Assign student to coach
 * @param {uuid} coachId
 * @param {uuid} studentId
 * @returns Assigns the student to the given coach
 * @author Holly Raetz
 */
export function assignStudentHandler(coachId, studentId) {
  const data = { coachId, studentId };
  return assignStudent(data);
}

/**
 * Unassign student from coach
 * @param {uuid} coachId
 * @param {uuid} studentId
 * @returns Unassigns the student from the given coach
 * @author Holly Raetz
 */
export function unassignStudentHandler(coachId, studentId) {
  const data = { coachId, studentId };
  return unassignStudent(data);
}
