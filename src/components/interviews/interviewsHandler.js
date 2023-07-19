import {
  CreateStudentAnswers,
  GetInterviewAndQuestions,
  addInterview,
  deleteInterview,
  editAnswer,
  editInterview,
  getInterview,
  getInterviews,
  getStudentInterviewResponses,
} from '../../services/interviews/interviews';

export function getInterviewsHandler() {
  return getInterviews();
}

export function getInterviewHandler(interviewId) {
  return getInterview(interviewId);
}

export function getInterviewAndQuestionsHandler(interviewId) {
  return GetInterviewAndQuestions(interviewId);
}

export function addInterviewHandler(interviewName) {
  const data = { interviewName };
  return addInterview(data);
}

export function editInterviewHandler(questions, interviewName, interviewId) {
  const data = { questions, interviewName, id: interviewId };
  return editInterview(data);
}

export function deleteInterviewHandler(interviewId) {
  return deleteInterview(interviewId);
}

export function getStudentInterviewResponsesHandler(studentId, interviewId) {
  return getStudentInterviewResponses(studentId, interviewId);
}

export function CreateStudentAnswersHandler(
  answerString,
  studentId,
  questionId,
  interviewId
) {
  const data = { answerString, studentId, questionId, interviewId };
  return CreateStudentAnswers(data);
}

export function editAnswerHandler(answerString, id) {
  const data = { answerString, id };
  return editAnswer(data);
}
