import React from 'react';
import GenericModal from '../shared/generic-modal';
import { CreateStudentAnswersHandler } from './interviewsHandler';

export function SubmitInterviewModal(props) {
  const { questions, answers, interviewId, studentId } = props;
  const submitInterview = async () => {
    await CreateStudentAnswersHandler(
      answers,
      questions,
      studentId,
      interviewId
    );
  };

  return (
    <GenericModal
      openModal="Submit Interview"
      modalHeadingTitle="Submit Interview"
      modalMessage="Are you sure you want to submit the Interview?"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      onActionButtonClick={submitInterview}
    />
  );
}
