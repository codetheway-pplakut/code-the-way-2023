import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../../shared/generic-modal';
import { deleteInterviewHandler } from '../interviewsHandler';

export function DeleteInterviewModal(props) {
  const { interviewId, interviewName, onSubmit } = props;

  const deleteInterviewAction = async () => {
    await deleteInterviewHandler(interviewId);
    await onSubmit();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Coach"
      modalMessage={`Are you sure you want to delete ${interviewName}?`}
      actionButtonTitle="Delete"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      onActionButtonClick={deleteInterviewAction}
    />
  );
}
DeleteInterviewModal.propTypes = {
  interviewId: PropTypes.string,
  interviewName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

DeleteInterviewModal.defaultProps = {
  interviewId: '',
  interviewName: '',
};
