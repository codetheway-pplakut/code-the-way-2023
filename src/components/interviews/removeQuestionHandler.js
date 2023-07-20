import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericModal } from '../shared/generic-modal';
import { editInterviewHandler } from './interviewsHandler';

export function RemoveQuestionModal(props) {
  const { interview, questionId, onRemoval } = props;
  console.log(interview);
  const deactivateStudentAction = async () => {
    let updatedInterview = interview;
    for (let i = 0; i < interview.questions.length; i += 1) {
      if (interview.questions[i].questionId === questionId) {
        updatedInterview = {
          interviewId: interview.id,
          questions: [interview.questions.splice(0, 1)],
          interviewName: interview.interviewName,
        };
        break;
      }
    }
    await editInterviewHandler(updatedInterview);
    if (onRemoval) onRemoval();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Student"
      modalMessage="Are you sure you want to remove this Question?: "
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      onActionButtonClick={deactivateStudentAction}
    />
  );
}

RemoveQuestionModal.propTypes = {
  interview: PropTypes.object,
  questionId: PropTypes.string,
  onRemoval: PropTypes.func.isRequired,
};

RemoveQuestionModal.defaultProps = {
  questionId: '',
  interview: {},
};
