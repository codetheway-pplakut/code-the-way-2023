import { callApi } from '../../utils/call-api/call-api';

export const getQuestion = (questionId) =>
  callApi({ url: '/Questions/', params: questionId });

export const addQuestion = (question) =>
  callApi({ url: '/Questions', data: question, method: 'POST' });

export const editQuestion = (question) =>
  callApi({ url: '/Questions', data: question, method: 'PUT' });

export const deleteQuestion = (questionId) =>
  callApi({ url: '/Questions', params: questionId, method: 'DELETE' });
