import { callApi } from '../../utils/call-api/call-api';

export const getStudents = async () => callApi({ url: '/Students' });

export const getStudentById = (id) =>
  callApi({
    url: `/Students/${id}`,
  });

// Takes in firstName, lastName, dateOfBirth, cellPhone, and email
export const addStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
  });

export const editStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
  });

export const deleteStudent = async (studentId) =>
  callApi({
    url: '/Students',
    params: studentId,
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
  });
