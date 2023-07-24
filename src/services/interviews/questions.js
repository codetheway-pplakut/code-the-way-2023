import { callApi } from '../../utils/call-api/call-api';

export const getQuestion = (questionId) =>
  callApi({ url: '/Questions/', params: questionId });

export const addQuestion = (question) =>
  callApi({ url: '/Questions', data: question, method: 'POST' });

export const editQuestion = (question) =>
  callApi({ url: '/Questions', data: question, method: 'PUT' });

export const deleteQuestion = (questionId) =>
  callApi({ url: '/Questions', params: questionId, method: 'DELETE' });

export const addQuestionToInterview = (data) =>
  callApi({ url: '/Questions/AddQuestionToInterview', data, method: 'POST' });

export const updateQuestionInInterview = (data) =>
  callApi({ url: '/Questions/UpdateQuestionInInterview', data, method: 'PUT' });

export const removeQuestionFromInterview = (data) =>
  callApi({
    url: '/Questions/RemoveQuestionFromInterview',
    data,
    method: 'DELETE',
  });
