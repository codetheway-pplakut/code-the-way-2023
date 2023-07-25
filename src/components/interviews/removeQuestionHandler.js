import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../shared/generic-modal';
import { editInterviewHandler } from './interviewsHandler';
import { removeQuestionFromInterviewHandler } from './questionsHandler';

export function RemoveQuestionModal(props) {
  const { interview, questionId, onRemoval } = props;
  const deactivateStudentAction = async () => {
    await removeQuestionFromInterviewHandler(interview.id, questionId);
    if (onRemoval) onRemoval();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Remove Question"
      modalMessage="Are you sure you want to remove this Question?"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Remove"
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
