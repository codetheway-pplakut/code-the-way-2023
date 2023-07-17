import { callApi } from '../../utils/call-api/call-api';

export const getInterview = async (interviewId) =>
  callApi({ url: `/Interviews/${interviewId}` });

export const getStudentResponse = (studentId) =>
  callApi({ url: `/Interviews/student-responses/${studentId}` });

/**
 *
 * @param {[{answerString:string, id:UUID, studentId:UUID, questionId:UUID, questionString:string, itnerviewId:UUID, isArchived:boolean, studentName:string, interviewName:string}]} studentResponse
 * @returns
 */
export const createStudentResponse = (studentResponse) =>
  callApi({
    url: '/Interviews/student-responses',
    data: studentResponse,
    method: 'POST',
  });
