import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deactivateAdminHandler, activateAdminHandler } from './adminHandlers';
import { GenericModal } from '../shared/generic-modal';

export function DeactivateAdminModal(props) {
  const { adminId, adminEmail, onAdminDeactivate } = props;
  const deactivateAdminAction = async () => {
    await deactivateAdminHandler(adminId);
    if (onAdminDeactivate) onAdminDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Admin"
      modalMessage={`Are you sure you want to deactivate admin ${adminEmail}?`}
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      onActionButtonClick={deactivateAdminAction}
    />
  );
}
DeactivateAdminModal.propTypes = {
  adminId: PropTypes.string,
  onAdminDeactivate: PropTypes.func.isRequired,
  adminEmail: PropTypes.string,
};

DeactivateAdminModal.defaultProps = {
  adminId: '',
  adminEmail: '',
};

export function ActivateAdminModal(props) {
  const { adminId, adminEmail, onAdminActivate } = props;
  const activateAdminAction = async () => {
    await activateAdminHandler(adminId);
    if (onAdminActivate) onAdminActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Admin"
      modalMessage={`Are you sure you want to activate admin ${adminEmail}?`}
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      onActionButtonClick={activateAdminAction}
    />
  );
}
ActivateAdminModal.propTypes = {
  adminId: PropTypes.string,
  onAdminActivate: PropTypes.func.isRequired,
  adminEmail: PropTypes.string,
};

ActivateAdminModal.defaultProps = {
  adminId: '',
  adminEmail: '',
};
