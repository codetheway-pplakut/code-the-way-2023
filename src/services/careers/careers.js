import { callApi } from '../../utils/call-api/call-api';

export const getCareerById = (id) => callApi({ url: `/careers/${id}` });

/**
 * @param {{id:UUID, studentId:UUID, collegeBound: boolean, careerCluster: integer, specificCareer: string, technicalCollegeBound:boolean}} career
 */
export const addCareer = (career) =>
  callApi({ url: '/careers', data: career, method: 'POST' });

/**
 * @param {{id:UUID, studentId:UUID, collegeBound: boolean, careerCluster: integer, specificCareer: string, technicalCollegeBound:boolean}} career
 */
export const editCareer = (career) =>
  callApi({ url: '/careers', data: career, method: 'PUT' });

export const deleteCareer = (careerId) =>
  callApi({ url: `/careers/${careerId}`, method: 'DELETE' });

export const getStudentCareers = (studentId) =>
  callApi({ url: `/careers/student-careers/${studentId}` });
