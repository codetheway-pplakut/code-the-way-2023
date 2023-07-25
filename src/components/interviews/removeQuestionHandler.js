import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import GenericModal from '../shared/generic-modal';
import { editInterviewHandler } from './interviewsHandler';
import { removeQuestionFromInterviewHandler } from './questionsHandler';

export function RemoveQuestionModal(props) {
  const { interview, questionId, onRemoval, questionName } = props;
  const deactivateStudentAction = async () => {
    await removeQuestionFromInterviewHandler(interview.id, questionId);
    if (onRemoval) onRemoval();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Remove Question"
      modalMessage={
        <Typography fontSize={20}>
          Are you sure you want to remove this question?
          <Typography paddingTop={3} color="#505050">
            Question: {questionName}
          </Typography>
        </Typography>
      }
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
  questionName: PropTypes.string,
};

RemoveQuestionModal.defaultProps = {
  questionId: '',
  interview: {},
  questionName: '',
};
