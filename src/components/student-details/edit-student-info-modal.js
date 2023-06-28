import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import GenericModal from '../coaches/modal-component';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editStudent, getStudentById } from '../../services/students/students';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';

// const TEST_ID = 'c4f8bbf7-2ad0-4e97-6a3c-08da762785c9';

export function EditStudentInfoModal(props) {
  // const { studentId } = props;
  const { student, onSaveSuccess, isParent } = props;

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentCellPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [parentCellPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (isParent) {
      setParentFirstName(student.parentFirstName);
      setParentLastName(student.parentLastName);
      setParentPhone(student.parentCellPhone);
      setParentEmail(student.parentEmail);
      setHeader('Edit Parent Information');
    } else {
      setStudentFirstName(student.studentFirstName);
      setStudentLastName(student.studentLastName);
      setStudentPhone(student.studentCellPhone);
      setStudentEmail(student.studentEmail);
      setHeader('Edit Student Information');
    }
  }, [student]);

  const requestSave = async () => {
    const updatedStudent = {
      ...student,
      studentFirstName,
      studentLastName,
      studentCellPhone,
      studentEmail,
    };
    const updatedParent = {
      ...student,
      parentFirstName,
      parentLastName,
      parentCellPhone,
      parentEmail,
    };

    await editStudent(isParent ? updatedParent : updatedStudent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal="open"
    >
      <TextFieldWithErrorMessage
        label="First Name"
        onChange={(value) =>
          isParent ? setParentFirstName(value) : setStudentFirstName(value)
        }
        value={isParent ? parentFirstName : studentFirstName}
      />
      <TextFieldWithErrorMessage
        label="Last Name"
        onChange={(value) =>
          isParent ? setParentLastName(value) : setStudentLastName(value)
        }
        value={isParent ? parentLastName : studentLastName}
      />
      <TextFieldWithErrorMessage
        label="Phone"
        onChange={(value) =>
          isParent ? setParentPhone(value) : setStudentPhone(value)
        }
        value={isParent ? parentCellPhone : studentCellPhone}
      />
      <TextFieldWithErrorMessage
        label="Email"
        onChange={(value) =>
          isParent ? setParentEmail(value) : setStudentEmail(value)
        }
        value={isParent ? parentEmail : studentEmail}
      />
    </GenericModal>
  );
}

EditStudentInfoModal.propTypes = {
  student: PropTypes.func,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
  isParent: false,
};
