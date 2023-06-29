import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { deactivateCoachHandler } from './coachHandlers';
import GenericModal from '../shared/generic-modal';

export function DeactivateCoachModal(props) {
  const { coachId, coachEmail, onCoachDeactivate } = props;
  const deactivateCoachAction = async () => {
    await deactivateCoachHandler(coachId, coachEmail, coachEmail);
    if (onCoachDeactivate) onCoachDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Coach"
      modalMessage="Are you sure you want to deactivate this coach?"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      onActionButtonClick={deactivateCoachAction}
    />
  );
}
DeactivateCoachModal.propTypes = {
  coachId: PropTypes.string,
  coachEmail: PropTypes.string,
  onCoachDeactivate: PropTypes.func.isRequired,
};

DeactivateCoachModal.defaultProps = {
  coachId: '',
  coachEmail: '',
};
