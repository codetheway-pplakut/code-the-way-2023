import {
  addAnswer,
  addAnswers,
  deleteAnswer,
  editAnswer,
  getAnswer,
  getAnswerToQuestion,
} from '../../services/interviews/answers';

export function getAnswerHandler(answerId) {
  return getAnswer(answerId);
}

export function getAnswerToQuestionHandler(studentId, questionId) {
  return getAnswerToQuestion(studentId, questionId);
}

export function addAnswerHandler(answer) {
  return addAnswer(answer);
}

export function addAnswersHandler(...answers) {
  return addAnswers(answers);
}

export function editAnswerHandler(answer) {
  return editAnswer(answer);
}

export function deleteAnswerHandler(answerId) {
  return deleteAnswer(answerId);
}
