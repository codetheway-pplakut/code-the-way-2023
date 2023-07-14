import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validate } from 'validate.js';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../shared/text-field-with-error-message';
import { editStudent } from '../../services/students/students';

export default function EditStudentInfoModal(props) {
  const { student, onSaveSuccess } = props;

  const [dateGoalSet, setDateGoalSet] = useState(new Date());

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentCellPhone, setStudentCellPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [studentApartmentNumber, setStudentApartmentNumber] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentState, setStudentState] = useState('');
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [studentZipCode, setStudentZipCode] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    setStudentFirstName(student.studentFirstName);
    setStudentLastName(student.studentLastName);
    setStudentCellPhone(student.studentCellPhone);
    setStudentEmail(student.studentEmail);
    setStudentAddress(student.studentAddress);
    setStudentApartmentNumber(student.studentApartmentNumber);
    setStudentState(student.studentState);
    setStudentCity(student.studentCity);
    setStudentZipCode(student.studentZipCode);
    setStudentDateOfBirth(student.studentDateOfBirth);
    setHeader('Edit Student Information');
  }, [student]);

  const requestSave = async () => {
    const updatedStudent = {
      ...student,
      studentFirstName,
      studentLastName,
      studentCellPhone,
      studentEmail,
      studentAddress,
      studentApartmentNumber,
      studentCity,
      studentState,
      studentZipCode,
      studentDateOfBirth,
    };

    await editStudent(updatedStudent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal={<EditIcon />}
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="First Name"
              onChange={(value) => setStudentFirstName(value)}
              value={studentFirstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="Last Name"
              onChange={(value) => setStudentLastName(value)}
              value={studentLastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            fullWidth
            label="Preferred Phone Number"
            onChange={(value) => setStudentCellPhone(value)}
            value={studentCellPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Email"
            onChange={(value) => setStudentEmail(value)}
            value={studentEmail}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextFieldWithErrorMessage
              label="Address"
              onChange={(value) => setStudentAddress(value)}
              value={studentAddress}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Apt."
              onChange={(value) => setStudentApartmentNumber(value)}
              value={studentApartmentNumber}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="City"
              onChange={(value) => setStudentCity(value)}
              value={studentCity}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="State"
              onChange={(value) => setStudentState(value)}
              value={studentState}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Zip Code"
              onChange={(value) => setStudentZipCode(value)}
              value={studentZipCode}
            />
          </Grid>

          <Grid item my={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                margin="normal"
                sx={{ width: 210 }}
                label="Date of Birth"
                value={dayjs(studentDateOfBirth)}
                onChange={(newValue) => setStudentDateOfBirth(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

export function EditParentModal(props) {
  const { student, onSaveSuccess } = props;

  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [parentCellPhone, setParentCellPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [parentApartmentNumber, setParentApartmentNumber] = useState('');
  const [parentCity, setParentCity] = useState('');
  const [parentState, setParentState] = useState('');
  const [parentZipCode, setParentZipCode] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    setParentFirstName(student.parentFirstName);
    setParentLastName(student.parentLastName);
    setParentCellPhone(student.parentCellPhone);
    setParentEmail(student.parentEmail);
    setAddress(student.address);
    setParentApartmentNumber(student.parentApartmentNumber);
    setParentState(student.parentState);
    setParentCity(student.parentCity);
    setParentZipCode(student.parentZipCode);
    setHeader('Edit Parent Information');
  }, [student]);

  const requestSave = async () => {
    const updatedParent = {
      ...student,
      parentFirstName,
      parentLastName,
      parentCellPhone,
      parentEmail,
      address,
      parentApartmentNumber,
      parentCity,
      parentState,
      parentZipCode,
    };

    await editStudent(updatedParent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal={<EditIcon />}
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="First Name"
              onChange={(value) => setParentFirstName(value)}
              value={parentFirstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="Last Name"
              onChange={(value) => setParentLastName(value)}
              value={parentLastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            fullWidth
            label="Preferred Phone Number"
            onChange={(value) => setParentCellPhone(value)}
            value={parentCellPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Email"
            onChange={(value) => setParentEmail(value)}
            value={parentEmail}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextFieldWithErrorMessage
              label="Address"
              onChange={(value) => setAddress(value)}
              value={address}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Apt."
              onChange={(value) => setParentApartmentNumber(value)}
              value={parentApartmentNumber}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="City"
              onChange={(value) => setParentCity(value)}
              value={parentCity}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="State"
              onChange={(value) => setParentState(value)}
              value={parentState}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Zip Code"
              onChange={(value) => setParentZipCode(value)}
              value={parentZipCode}
            />
          </Grid>
        </Grid>
      </Grid>
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
