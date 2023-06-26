import { callApi } from '../../utils/call-api/call-api';

/**
 * Basic Request for all students at once. Gets all, regardless of state.
 * @returns {[{id:uuid, state:string, firstName: string, lastName: string, email:email, studentCellPhone:string, parentFirstName: string, parentLastName: string, coachId: uuid, createdOnUtc: Date, updatedOnUtc: Date}]}
 * @author Joey Schroeder
 */
export const getStudents = async () => callApi({ url: '/Students' });

/**
 * Basic Request for active students at once. Gets active students only.
 * @returns {[{id:uuid, state:string, firstName: string, lastName: string, email:email, studentCellPhone:string, parentFirstName: string, parentLastName: string, coachId: uuid, createdOnUtc: Date, updatedOnUtc: Date}]}
 * @author Joey Schroeder
 */
export const getActiveStudents = async () =>
  callApi({ url: '/Students/GetActiveStudents' });

/**
 * Basic Request for applied students at once. Gets applied students only.
 * @returns {[{id:uuid, state:string, firstName: string, lastName: string, email:email, studentCellPhone:string, parentFirstName: string, parentLastName: string, coachId: uuid, createdOnUtc: Date, updatedOnUtc: Date}]}
 * @author Joey Schroeder
 */
export const getAppliedStudents = async () =>
  callApi({ url: '/Students/GetAppliedStudents' });

/**
 * Gets the data of student associated with passed id.
 *
 * @param {uuid} id - Id of student to get info of
 * @returns All data stored of specific student
 * @author Adam Miller
 */
export const getStudentById = (id) =>
  callApi({
    url: `/Students/${id}`,
  });

/**
 * Creates / Registers a student initial. Subject to change with Student Register changes.
 *
 * @param {{firstName:string, lastName: string, dateOfBirth: Date, cellPhone:string, email:email}} student
 * @author Adam Miller
 */
export const addStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'POST',
  });

/**
 * edits a Student Record. This function takes in a whole student at once.
 *
 * @param {Student} student Full student object which will replace currently stored one of same Id.
 * @author Adam Miller
 */
export const editStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'PUT',
  });

/**
 * Deletes the given student from the database. DO NOT USE - For DB Cleaning Only
 *
 * @param {uuid} studentId - ID of student to delete
 * @author Adam Miller
 */
export const deleteStudent = async (studentId) =>
  callApi({
    url: '/Students',
    params: studentId,
    method: 'DELETE',
  });

/**
 * Assigns the studentId's student to the CoachId's Coach
 *
 * @param {uuid} studentId - Student to assign to Coach
 * @param {uuid} coachId  - Coach to assign to Student
 * @author Adam Miller
 */
export const assignStudent = async (studentId, coachId) =>
  callApi({
    url: '/Students/assign-student',
    method: 'POST',
    data: { coachId, studentId },
  });

/**
 * Unassigns the studentId's student from its coach
 *
 * @param {uuid} studentId - Student to unassign
 * @param {uuid} coachId - Id of coach; likely not actually used.
 * @author Adam Miller
 */
export const unassignStudent = async (studentId, coachId) =>
  callApi({
    url: '/Students/unassign-student',
    method: 'POST',
    data: { coachId, studentId },
  });

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
