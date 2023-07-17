import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getQuestion,
} from '../../../services/interviews/questions';

export function getQuestionHandler(questionId) {
  return getQuestion(questionId);
}

export function addQuestionHandler(question) {
  return addQuestion(question);
}

export function editQuestionHandler(question) {
  return editQuestion(question);
}

export function deleteQuestionHandler(questionId) {
  return deleteQuestion(questionId);
}
