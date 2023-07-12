import React from 'react';
import PropTypes from 'prop-types';
import {
  setStudentActiveHandler,
  setStudentRejectedHandler,
} from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function ActivateStudentModal(props) {
  const { studentId, onStudentActivate } = props;
  const ActivateStudentAction = async () => {
    await setStudentActiveHandler(studentId);
    if (onStudentActivate) onStudentActivate();
  };

  ActivateStudentModal.propTypes = {
    studentId: PropTypes.string,
    onStudentActivate: PropTypes.func.isRequired,
  };

  ActivateStudentModal.defaultProps = {
    studentId: '',
  };
  return (
    <GenericModal
      openModal="Accept"
      modalHeadingTitle="Accept Student"
      modalMessage="Are you sure you want to accept this student?"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Accept"
      cancelButtonTitle="Cancel"
      onActionButtonClick={ActivateStudentAction}
    />
  );
}

export function RejectStudentModal(props) {
  const { studentId, onStudentReject } = props;
  const RejectStudentAction = async () => {
    await setStudentRejectedHandler(studentId);
    if (onStudentReject) onStudentReject();
  };

  RejectStudentModal.propTypes = {
    studentId: PropTypes.string,
    onStudentReject: PropTypes.func.isRequired,
  };

  RejectStudentModal.defaultProps = {
    studentId: '',
  };
  return (
    <GenericModal
      openModal="Reject"
      modalHeadingTitle="Reject Student"
      modalMessage="Are you sure you want to reject this student?"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Reject"
      cancelButtonTitle="Cancel"
      onActionButtonClick={RejectStudentAction}
    />
  );
}
