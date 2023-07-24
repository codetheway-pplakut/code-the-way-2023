import {
  addQuestion,
  addQuestionToInterview,
  deleteQuestion,
  editQuestion,
  getQuestion,
  removeQuestionFromInterview,
  updateQuestionInInterview,
} from '../../services/interviews/questions';

export function getQuestionHandler(questionId) {
  return getQuestion(questionId);
}

export function addQuestionHandler(questionString) {
  const data = { questionString };
  return addQuestion(data);
}

export function editQuestionHandler(question) {
  return editQuestion(question);
}

export function deleteQuestionHandler(questionId) {
  return deleteQuestion(questionId);
}

export function addQuestionToInterviewHandler(interviewId, order, questionId) {
  const data = { interviewId, order, questionId };
  return addQuestionToInterview(data);
}

export function updateQuestionInInterviewHandler(
  interviewId,
  questionOrder,
  questionId
) {
  const data = { interviewId, questionOrder, questionId };
  return updateQuestionInInterview(data);
}

export function removeQuestionFromInterviewHandler(interviewId, questionId) {
  const data = { interviewId, questionId };
  return removeQuestionFromInterview(data);
}
