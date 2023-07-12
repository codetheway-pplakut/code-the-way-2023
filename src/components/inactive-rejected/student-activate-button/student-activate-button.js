import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import {
  setStudentActiveHandler,
  setStudentInactiveHandler,
} from '../../students/studentHandlers';
import GenericModal from '../../shared/generic-modal';

export function ActivateStudentModal(props) {
  const { studentId, onStudentActivate } = props;
  const activateStudentAction = async () => {
    await setStudentActiveHandler(studentId);
    if (onStudentActivate) onStudentActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Student"
      modalMessage="Are you sure you want to activate this student?"
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      onActionButtonClick={activateStudentAction}
    />
  );
}
ActivateStudentModal.propTypes = {
  studentId: PropTypes.string,
  onStudentActivate: PropTypes.func.isRequired,
};

ActivateStudentModal.defaultProps = {
  studentId: '',
};
