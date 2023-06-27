import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import GenericModal from '../coaches/modal-component';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editStudent, getStudentById } from '../../services/students/students';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';

const TEST_ID = 'c4f8bbf7-2ad0-4e97-6a3c-08da762785c9';

export function EditStudentInfoModal(props) {
  // const { studentId } = props;
  const studentId = TEST_ID;

  const [isLoading, setIsLoading] = useState(false);

  const [student, setStudent] = useState({});

  const [studentFirstName, setFirstName] = useState('');
  const [studentLastName, setLastName] = useState('');
  const [studentCellPhone, setPhone] = useState('');
  const [studentEmail, setEmail] = useState('');

  useEffect(() => {
    const requestStudent = async () => {
      if (!studentId) return;

      setIsLoading(true);

      const response = await getStudentById(studentId);
      const { data } = response;

      setStudent(data.student);

      setFirstName(data.student.studentFirstName);
      setLastName(data.student.studentLastName);
      setPhone(data.student.studentCellPhone);
      setEmail(data.student.studentEmail);

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

    setIsLoading(true);
    await editStudent(updatedStudent);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <CircularProgressOverlay active={isLoading} />
      <GenericModal
        actionButtonTitle="Submit"
        cancelButtonTitle="cancel"
        modalHeadingTitle="Edit Student Information"
        onActionButtonClick={requestSave}
        openModal="open"
      >
        <TextFieldWithErrorMessage
          label="First Name"
          onChange={(value) => setFirstName(value)}
          value={studentFirstName}
        />
        <TextFieldWithErrorMessage
          label="Last Name"
          onChange={(value) => setLastName(value)}
          value={studentLastName}
        />
        <TextFieldWithErrorMessage
          label="Phone"
          onChange={(value) => setPhone(value)}
          value={studentCellPhone}
        />
        <TextFieldWithErrorMessage
          label="Email"
          onChange={(value) => setEmail(value)}
          value={studentEmail}
        />
      </GenericModal>
    </React.Fragment>
  );
}

EditStudentInfoModal.propTypes = {
  studentId: PropTypes.string,
};

EditStudentInfoModal.defaultProps = {
  studentId: '',
};
