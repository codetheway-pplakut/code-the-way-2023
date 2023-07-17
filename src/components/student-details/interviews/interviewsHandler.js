import {
  createStudentResponse,
  getInterview,
  getStudentResponse,
} from '../../../services/interviews/interviews';

export function getInterviewHandler(interviewId) {
  return getInterview(interviewId);
}

export function getStudentResponseHandler(studentId) {
  return getStudentResponse(studentId);
}

export function createStudentResponseHandler(studentResponse) {
  return createStudentResponse(studentResponse);
}
