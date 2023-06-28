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
  const { studentId, onSaveSuccess, isParent } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [student, setStudent] = useState({});

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
    const requestStudent = async () => {
      if (!studentId) return;

      setIsLoading(true);

      const response = await getStudentById(studentId);
      const { data } = response;

      setStudent(data.student);
      if (isParent) {
        setParentFirstName(data.student.parentFirstName);
        setParentLastName(data.student.parentLastName);
        setParentPhone(data.student.parentCellPhone);
        setParentEmail(data.student.parentEmail);
        setHeader('Edit Parent Information');
      } else {
        setStudentFirstName(data.student.studentFirstName);
        setStudentLastName(data.student.studentLastName);
        setStudentPhone(data.student.studentCellPhone);
        setStudentEmail(data.student.studentEmail);
        setHeader('Edit Student Information');
      }
      setIsLoading(false);
    };

    requestStudent();
  }, [studentId]);

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

    setIsLoading(true);

    await editStudent(isParent ? updatedParent : updatedStudent);

    if (onSaveSuccess) onSaveSuccess();
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <CircularProgressOverlay active={isLoading} />
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
    </React.Fragment>
  );
}

EditStudentInfoModal.propTypes = {
  studentId: PropTypes.string,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  studentId: '',
  onSaveSuccess: undefined,
  isParent: false,
};
