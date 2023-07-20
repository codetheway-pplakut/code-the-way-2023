import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import {
  setStudentActiveHandler,
  setStudentRejectedHandler,
} from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function ActivateStudentModal(props) {
  const { studentId, student, onStudentActivate } = props;
  const ActivateStudentAction = async () => {
    await setStudentActiveHandler(studentId);
    if (onStudentActivate) onStudentActivate();
  };

  ActivateStudentModal.propTypes = {
    studentId: PropTypes.string,
    onStudentActivate: PropTypes.func.isRequired,
    student: PropTypes.object,
  };

  ActivateStudentModal.defaultProps = {
    studentId: '',
    student: [],
  };
  return (
    <GenericModal
      openModal={<Typography>Accept</Typography>}
      modalHeadingTitle="Accept Student"
      modalMessage={`Are you sure you want to accept student ${student.firstName} ${student.lastName}?`}
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Accept"
      cancelButtonTitle="Cancel"
      onActionButtonClick={ActivateStudentAction}
    />
  );
}

export function RejectStudentModal(props) {
  const { studentId, student, onStudentReject } = props;
  const RejectStudentAction = async () => {
    await setStudentRejectedHandler(studentId);
    if (onStudentReject) onStudentReject();
  };

  RejectStudentModal.propTypes = {
    studentId: PropTypes.string,
    onStudentReject: PropTypes.func.isRequired,
    student: PropTypes.object,
  };

  RejectStudentModal.defaultProps = {
    studentId: '',
    student: [],
  };
  return (
    <GenericModal
      openModal="Reject"
      modalHeadingTitle="Reject Student"
      modalMessage={`Are you sure you want to reject student ${student.firstName} ${student.lastName}?`}
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Reject"
      cancelButtonTitle="Cancel"
      onActionButtonClick={RejectStudentAction}
    />
  );
}
