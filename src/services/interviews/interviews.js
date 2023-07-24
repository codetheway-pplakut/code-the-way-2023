import { callApi } from '../../utils/call-api/call-api';

export const getInterviews = () =>
  callApi({ url: '/Interviews/GetInterviews' });

export const getInterview = (interviewId) =>
  callApi({ url: `/Interviews/GetInterview/${interviewId}` });

export const GetInterviewAndQuestions = (interviewId) =>
  callApi({ url: `/Interviews/GetInterviewAndQuestions/${interviewId}` });

export const addInterview = async (interview) =>
  callApi({ url: '/Interviews', data: interview, method: 'POST' });

export const editInterview = async (interview) =>
  callApi({ url: '/Interviews', data: interview, method: 'PUT' });

export const deleteInterview = async (id) => {
  callApi({ url: '/Interviews', params: id, method: 'DELETE' });
};

export const getStudentInterviewResponses = (studentId, interviewId) =>
  callApi({
    url: `/Interviews/GetStudentInterviewResponses/${studentId}/${interviewId}`,
  });

export const getAllStudentInterviewResponses = (studentId) =>
  callApi({
    url: `/Interviews/GetStudentInterviews/${studentId}`,
  });

export const CreateStudentAnswers = async (answer) =>
  callApi({
    url: '/Answers/CreateAnswers',
    data: answer,
    method: 'POST',
  });

export const editAnswer = async (answer) =>
  callApi({ url: '/Answers', data: answer, method: 'PUT' });

export const deleteAnswer = async (answerId) =>
  callApi({ url: '/Answers', params: answerId, method: 'DELETE' });
