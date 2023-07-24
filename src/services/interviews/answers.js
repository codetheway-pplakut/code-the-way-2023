import { callApi } from '../../utils/call-api/call-api';

export const getAnswer = (answerId) =>
  callApi({ url: `/Answers/${answerId}$` });

export const getAnswerToQuestion = (studentId, questionId) =>
  callApi({
    url: `/Answers/${studentId}/${questionId}`,
  });

export const addAnswer = (answer) =>
  callApi({ url: '/Answers/CreateAnswer', data: answer, method: 'POST' });

export const addAnswers = (answers) =>
  callApi({ url: '/Answers/CreateAnswers', data: answers, method: 'POST' });

export const editAnswer = (answer) =>
  callApi({ url: '/Answers', data: answer, method: 'PUT' });

export const deleteAnswer = (answerId) =>
  callApi({ url: '/Answers', params: answerId, method: 'DELETE' });
