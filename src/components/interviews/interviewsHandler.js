import uuid from 'react-uuid';
import {
  CreateStudentAnswers,
  GetInterviewAndQuestions,
  addInterview,
  deleteInterview,
  editAnswer,
  editInterview,
  getAllStudentInterviewResponses,
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

export function getStudentInterviewsHandler(studentId) {
  return getAllStudentInterviewResponses(studentId);
}

export function CreateStudentAnswersHandler(
  answers,
  questions,
  studentId,
  interviewId
) {
  const data = [{}];
  for (let i = 0; i < answers.length; i += 1) {
    data[i] = {
      answerString: answers[i],
      id: uuid(),
      questionId: questions[i].id,
      studentId,
      interviewId,
      isArchived: false,
    };
  }
  return CreateStudentAnswers(data);
}

export function editAnswerHandler(answerString, id) {
  const data = { answerString, id };
  return editAnswer(data);
}
