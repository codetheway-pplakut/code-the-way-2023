import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { deactivateCoachHandler, activateCoachHandler } from './coachHandlers';
import { GenericModal } from '../shared/generic-modal';

export function DeactivateCoachModal(props) {
  const { coachId, coach, onCoachDeactivate } = props;
  const deactivateCoachAction = async () => {
    await deactivateCoachHandler(coachId, coach.coachEmail, coach.coachEmail);
    if (onCoachDeactivate) onCoachDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Coach"
      modalMessage={
        `Are you sure you want to deactivate coach ${coach.coachFirstName}` +
        ` ${coach.coachLastName}?`
      }
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
  coach: PropTypes.object,
  onCoachDeactivate: PropTypes.func.isRequired,
};

DeactivateCoachModal.defaultProps = {
  coachId: '',
  coach: [],
};

export function ActivateCoachModal(props) {
  const { coachId, coach, onCoachActivate } = props;
  const activateCoachAction = async () => {
    await activateCoachHandler(coachId, coach.coachEmail, coach.coachEmail);
    if (onCoachActivate) onCoachActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Coach"
      modalMessage={
        `Are you sure you want to activate coach ${coach.coachFirstName}` +
        ` ${coach.coachLastName}?`
      }
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      onActionButtonClick={activateCoachAction}
    />
  );
}
ActivateCoachModal.propTypes = {
  coachId: PropTypes.string,
  coach: PropTypes.object,
  onCoachActivate: PropTypes.func.isRequired,
};

ActivateCoachModal.defaultProps = {
  coachId: '',
  coach: [],
};
