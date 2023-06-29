import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { deactivateAdminHandler } from './adminHandlers';
import GenericModal from '../shared/generic-modal';

export function DeactivateAdminModal(props) {
  const { adminId, onAdminDeactivate } = props;
  const deactivateAdminAction = async () => {
    await deactivateAdminHandler(adminId);
    if (onAdminDeactivate) onAdminDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Admin"
      modalMessage="Are you sure you want to deactivate this admin?"
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
};

DeactivateAdminModal.defaultProps = {
  adminId: '',
};
