import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
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

  const [studentFirstNameEdit, setStudentFirstNameEdit] = React.useState(false);
  const [studentLastNameEdit, setStudentLastNameEdit] = React.useState(false);
  const [studentCellPhoneEdit, setStudentCellPhoneEdit] = React.useState(false);
  const [studentEmailEdit, setStudentEmailEdit] = React.useState(false);
  const [studentAddressEdit, setStudentAddressEdit] = React.useState(false);
  const [studentApartmentNumberEdit, setStudentApartmentNumberEdit] =
    React.useState(false);
  const [studentCityEdit, setStudentCityEdit] = React.useState(false);
  const [studentStateEdit, setStudentStateEdit] = React.useState(false);
  const [studentDateOfBirthEdit, setStudentDateOfBirthEdit] =
    React.useState(false);
  const [studentZipCodeEdit, setStudentZipCodeEdit] = React.useState(false);

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

  const validator = validate(
    {
      studentFirstName,
      studentLastName,
      studentEmail,
      studentDateOfBirth,
      studentCellPhone,
      studentAddress,
      studentApartmentNumber,
      studentCity,
      studentState,
      studentZipCode,
    },
    {
      studentFirstName: {
        presence: { allowEmpty: false, message: '' },
      },
      studentLastName: {
        presence: { allowEmpty: false },
      },
      studentEmail: {
        presence: { allowEmpty: false },
        email: true,
      },
      studentCellPhone: {
        presence: { allowEmpty: false },
      },
      dateOfBirth: {},
      studentAddress: {
        presence: { allowEmpty: false },
      },
      studentApartmentNumber: {
        presence: { allowEmpty: false },
      },
      studentCity: {
        presence: { allowEmpty: false },
      },
      studentState: {
        presence: { allowEmpty: false },
      },
      studentZipCode: {
        presence: { allowEmpty: false },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);

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
      actionButtonDisabled={actionButtonDisabled}
      openModal={<EditIcon />}
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              onChange={(event) => setStudentFirstName(event.target.value)}
              value={studentFirstName}
              errorText={
                studentFirstName.length < 1 ? 'Enter Student First Name' : ' '
              }
              error={studentFirstName.length < 1 && studentFirstNameEdit}
              onBlur={() => setStudentFirstNameEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={(event) => setStudentLastName(event.target.value)}
              value={studentLastName}
              errorText={
                studentLastName.length < 1 ? 'Enter Student Last Name' : ' '
              }
              error={studentLastName.length < 1 && studentLastNameEdit}
              onBlur={() => setStudentLastNameEdit(true)}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Preferred Phone Number"
            onChange={(event) => setStudentCellPhone(event.target.value)}
            value={studentCellPhone}
            errorText={
              studentCellPhone.length < 1 ? 'Enter Student Phone Number' : ' '
            }
            error={studentCellPhone.length < 1 && studentCellPhoneEdit}
            onBlur={() => setStudentCellPhoneEdit(true)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            onChange={(event) => setStudentEmail(event.target.value)}
            value={studentEmail}
            errorText={studentEmail.length < 1 ? 'Enter Student Email' : ' '}
            error={studentEmail.length < 1 && studentEmailEdit}
            onBlur={() => setStudentEmailEdit(true)}
            required
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Address"
              onChange={(event) => setStudentAddress(event.target.value)}
              value={studentAddress}
              errorText={
                studentAddress.length < 1 ? 'Enter Student Address' : ' '
              }
              error={studentAddress.length < 1 && studentAddressEdit}
              onBlur={() => setStudentAddressEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apt."
              onChange={(event) =>
                setStudentApartmentNumber(event.target.value)
              }
              value={studentApartmentNumber}
              errorText={
                studentApartmentNumber.length < 1
                  ? 'Enter Student Apartment Number'
                  : ' '
              }
              error={
                studentApartmentNumber.length < 1 && studentApartmentNumberEdit
              }
              onBlur={() => setStudentApartmentNumberEdit(true)}
              required
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="City"
              onChange={(event) => setStudentCity(event.target.value)}
              value={studentCity}
              errorText={studentCity.length < 1 ? 'Enter Student City' : ' '}
              error={studentCity.length < 1 && studentCityEdit}
              onBlur={() => setStudentCityEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="State"
              onChange={(event) => setStudentState(event.target.value)}
              value={studentState}
              errorText={studentState.length < 1 ? 'Enter Student State' : ' '}
              error={studentState.length < 1 && studentStateEdit}
              onBlur={() => setStudentStateEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip Code"
              onChange={(event) => setStudentZipCode(event.target.value)}
              value={studentZipCode}
              errorText={studentZipCode.length < 1 ? 'Enter Zip Code' : ' '}
              error={studentZipCode.length < 1 && studentZipCodeEdit}
              onBlur={() => setStudentZipCodeEdit(true)}
              required
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
