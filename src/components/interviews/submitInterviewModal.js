import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import Icon from '@mui/material/Icon';
import GenericModal from '../shared/generic-modal';
import { CreateStudentAnswersHandler } from './interviewsHandler';
import { CustomSubmitButton } from './custom-submit-button';

export function SubmitInterviewModal(props) {
  const { questions, answers, interviewId, interviewName, studentId } = props;
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const submitInterview = async () => {
    setSending(true);
    await CreateStudentAnswersHandler(
      answers,
      questions,
      studentId,
      interviewName,
      interviewId
    );
    setSending(false);
    navigate('/students');
  };

  return (
    <GenericModal
      openModal={<CustomSubmitButton />}
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
