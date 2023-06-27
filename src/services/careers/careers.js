import { callApi } from '../../utils/call-api/call-api';

export const getCareerById = (careerId) =>
  callApi({ url: '/Careers', param: careerId });

/**
 * @param {{id:UUID, studentId:UUID, collegeBound: boolean, careerCluster: integer, specificCareer: string, technicalCollegeBound:boolean}} career
 */
export const addCareer = (career) =>
  callApi({ url: '/Careers', data: career, method: 'POST' });

/**
 * @param {{id:UUID, studentId:UUID, collegeBound: boolean, careerCluster: integer, specificCareer: string, technicalCollegeBound:boolean}} career
 */
export const editCareer = (career) =>
  callApi({ url: '/Careers', data: career, method: 'PUT' });

export const deleteCareer = (careerId) =>
  callApi({ url: '/Careers', params: careerId, method: 'DELETE' });

export const getStudentCareers = (studentId) =>
  callApi({ url: `/careers/get-student-careers/${studentId}` });
