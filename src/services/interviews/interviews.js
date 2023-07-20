import { callApi } from '../../utils/call-api/call-api';

export const getInterviews = () =>
  callApi({ url: '/Interviews/GetInterviews' });

export const getInterview = (interviewId) =>
  callApi({ url: `/Interviews/GetInterview/${interviewId}` });

export const GetInterviewAndQuestions = (interviewId) =>
  callApi({ url: `/Interviews/GetInterviewAndQuestions/${interviewId}` });

export const addInterview = (interview) =>
  callApi({ url: '/Interviews', data: interview, method: 'POST' });

export const editInterview = (interview) =>
  callApi({ url: '/Interviews', data: interview, method: 'PUT' });

export const deleteInterview = (interviewId) =>
  callApi({ url: '/Interviews', params: interviewId, method: 'DELETE' });

export const getStudentInterviewResponses = (studentId, interviewId) =>
  callApi({
    url: `/Interviews/GetStudentInterviewResponses/${studentId}/${interviewId}`,
  });

export const getAllStudentInterviewResponses = (studentId) =>
  callApi({
    url: `/Interviews/GetStudentInterviews/${studentId}`,
  });

export const CreateStudentAnswers = (answer) =>
  callApi({
    url: '/Interviews/CreateStudentAnswers',
    data: answer,
    method: 'POST',
  });

export const editAnswer = (answer) =>
  callApi({ url: '/Answers', data: answer, method: 'PUT' });

export const deleteAnswer = (answerId) =>
  callApi({ url: '/Answers', params: answerId, method: 'DELETE' });
