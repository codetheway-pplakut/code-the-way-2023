import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import {
  setStudentInactiveHandler,
  setStudentActiveHandler,
} from './studentHandlers';
import GenericModal from '../shared/generic-modal';

export function DeactivateStudentModal(props) {
  const { studentId, student, onStudentDeactivate } = props;
  const deactivateStudentAction = async () => {
    await setStudentInactiveHandler(studentId);
    if (onStudentDeactivate) onStudentDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Student"
      modalMessage={`Are you sure you want to deactivate student ${student.firstName} ${student.lastName}?`}
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      onActionButtonClick={deactivateStudentAction}
    />
  );
}

DeactivateStudentModal.propTypes = {
  studentId: PropTypes.string,
  student: PropTypes.object,
  onStudentDeactivate: PropTypes.func.isRequired,
};

DeactivateStudentModal.defaultProps = {
  studentId: '',
  student: [],
};

export function ActivateStudentModal(props) {
  const { studentId, student, onStudentActivate } = props;
  const activateStudentAction = async () => {
    await setStudentActiveHandler(studentId);
    if (onStudentActivate) onStudentActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Student"
      modalMessage={`Are you sure you want to activate student ${student.firstName} ${student.lastName}?`}
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      onActionButtonClick={activateStudentAction}
    />
  );
}

ActivateStudentModal.propTypes = {
  studentId: PropTypes.string,
  student: PropTypes.object,
  onStudentActivate: PropTypes.func.isRequired,
};

ActivateStudentModal.defaultProps = {
  studentId: '',
  student: [],
};
