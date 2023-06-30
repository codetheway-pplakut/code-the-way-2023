import { callApi } from '../../utils/call-api/call-api';

export const getStudentInterviews = (studentId) =>
  callApi({ url: `/interviews/student-responses/${studentId}` });
