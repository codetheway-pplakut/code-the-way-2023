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
    if (student.studentFirstName !== null) {
      setStudentFirstName(student.studentFirstName);
    }
    if (student.studentLastName !== null) {
      setStudentLastName(student.studentLastName);
    }
    if (student.studentCellPhone !== null) {
      setStudentCellPhone(student.studentCellPhone);
    }
    if (student.studentEmail !== null) {
      setStudentEmail(student.studentEmail);
    }
    if (student.studentAddress !== null) {
      setStudentAddress(student.studentAddress);
    }
    if (student.studentApartmentNumber !== null) {
      setStudentApartmentNumber(student.studentApartmentNumber);
    }
    if (student.studentState !== null) {
      setStudentState(student.studentState);
    }
    if (student.studentDateOfBirth !== null) {
      setStudentDateOfBirth(student.studentDateOfBirth);
    }
    if (student.studentZipCode !== null) {
      setStudentZipCode(student.studentZipCode);
    }
    if (student.studentCity !== null) {
      setStudentCity(student.studentCity);
    }
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
        presence: { allowEmpty: true },
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
  const [parentAddress, setParentAddress] = useState('');
  const [parentApartmentNumber, setParentApartmentNumber] = useState('');
  const [parentCity, setParentCity] = useState('');
  const [parentState, setParentState] = useState('');
  const [parentZipCode, setParentZipCode] = useState('');
  const [header, setHeader] = useState('');

  const [parentFirstNameEdit, setParentFirstNameEdit] = useState(false);
  const [parentLastNameEdit, setParentLastNameEdit] = useState(false);
  const [parentCellPhoneEdit, setParentCellPhoneEdit] = useState(false);
  const [parentEmailEdit, setParentEmailEdit] = useState(false);
  const [parentAddressEdit, setParentAddressEdit] = useState(false);
  const [parentApartmentNumberEdit, setParentApartmentNumberEdit] =
    useState(false);
  const [parentCityEdit, setParentCityEdit] = useState(false);
  const [parentStateEdit, setParentStateEdit] = useState(false);
  const [parentZipCodeEdit, setParentZipCodeEdit] = useState(false);

  const validator = validate(
    {
      parentFirstName,
      parentLastName,
      parentEmail,
      parentCellPhone,
      parentAddress,
      parentApartmentNumber,
      parentCity,
      parentState,
      parentZipCode,
    },
    {
      parentFirstName: {
        presence: { allowEmpty: false, message: '' },
      },
      parentLastName: {
        presence: { allowEmpty: false },
      },
      parentEmail: {
        presence: { allowEmpty: false },
        email: true,
      },
      parentCellPhone: {
        presence: { allowEmpty: false },
        format: {
          pattern: '^([0-9]{3}){1}[-. ]?([0-9]{3}){1}[-. ]?([0-9]{4}){1}',
        },
      },
      parentAddress: { presence: { allowEmpty: false, message: '' } },
      parentApartmentNumber: { presence: { allowEmpty: false, message: '' } },
      parentCity: { presence: { allowEmpty: false, message: '' } },
      parentState: { presence: { allowEmpty: false, message: '' } },
      parentZipCode: {
        presence: { allowEmpty: false, message: '' },
        format: { pattern: '^([0-9]{5}){1}', message: 'must be 5 digits' },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);
  useEffect(() => {
    if (student.parentFirstName !== null) {
      setParentFirstName(student.parentFirstName);
    }
    if (student.parentLastName !== null) {
      setParentLastName(student.parentLastName);
    }
    if (student.parentCellPhone !== null) {
      setParentCellPhone(student.parentCellPhone);
    }
    if (student.parentEmail !== null) {
      setParentEmail(student.parentEmail);
    }
    if (student.address !== null) {
      setParentAddress(student.address);
    }
    if (student.parentApartmentNumber !== null) {
      setParentApartmentNumber(student.parentApartmentNumber);
    }
    if (student.parentCity !== null) {
      setParentCity(student.parentCity);
    }
    if (student.parentState !== null) {
      setParentState(student.parentState);
    }
    if (student.parentZipCode !== null) {
      setParentZipCode(student.parentZipCode);
    }
    setHeader('Edit Parent Information');
  }, [student]);

  const requestSave = async () => {
    const updatedParent = {
      ...student,
      parentFirstName,
      parentLastName,
      parentCellPhone,
      parentEmail,
      address: parentAddress,
      parentApartmentNumber,
      parentCity,
      parentState,
      parentZipCode,
    };

    setParentFirstNameEdit(false);
    setParentLastNameEdit(false);
    setParentCellPhoneEdit(false);
    setParentEmailEdit(false);
    setParentAddressEdit(false);
    setParentApartmentNumberEdit(false);
    setParentCityEdit(false);
    setParentStateEdit(false);
    setParentZipCodeEdit(false);

    await editStudent(updatedParent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      modalMessage="Fill out the fields below to save."
      actionButtonColor="submit"
      onActionButtonClick={requestSave}
      actionButtonDisabled={actionButtonDisabled}
      openModal={<EditIcon />}
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              onChange={(event) => setParentFirstName(event.target.value)}
              value={parentFirstName}
              errorText={parentFirstName.length < 1 ? 'Enter First Name' : ' '}
              error={parentFirstName.length < 1 && parentFirstNameEdit}
              required
              onBlur={() => setParentFirstNameEdit(true)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={(event) => setParentLastName(event.target.value)}
              value={parentLastName}
              errorText={parentLastName.length < 1 ? 'Enter Last Name' : ' '}
              error={parentLastName.length < 1 && parentLastNameEdit}
              required
              onBlur={() => setParentLastNameEdit(true)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Preferred Phone Number"
            onChange={(event) => setParentCellPhone(event.target.value)}
            value={parentCellPhone}
            errorText={parentCellPhone.length < 1 ? 'Enter Phone Number' : ' '}
            error={parentCellPhone.length < 1 && parentCellPhoneEdit}
            required
            onBlur={() => setParentCellPhoneEdit(true)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            onChange={(event) => setParentEmail(event.target.value)}
            value={parentEmail}
            errorText={parentEmail.length < 1 ? 'Enter Email' : ' '}
            error={parentEmail.length < 1 && parentEmailEdit}
            required
            onBlur={() => setParentEmailEdit(true)}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Address"
              onChange={(event) => setParentAddress(event.target.value)}
              value={parentAddress}
              errorText={parentAddress.length < 1 ? 'Enter Address' : ' '}
              error={parentAddress.length < 1 && parentAddressEdit}
              required
              onBlur={() => setParentAddressEdit(true)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apt."
              onChange={(event) => setParentApartmentNumber(event.target.value)}
              value={parentApartmentNumber}
              errorText={parentApartmentNumber.length < 1 ? 'Enter Apt.' : ' '}
              error={
                parentApartmentNumber.length < 1 && parentApartmentNumberEdit
              }
              required
              onBlur={() => setParentApartmentNumberEdit(true)}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="City"
              onChange={(event) => setParentCity(event.target.value)}
              value={parentCity}
              errorText={parentCity.length < 1 ? 'Enter City' : ' '}
              error={parentCity.length < 1 && parentCityEdit}
              required
              onBlur={() => setParentCityEdit(true)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="State"
              onChange={(event) => setParentState(event.target.value)}
              value={parentState}
              errorText={parentState.length < 1 ? 'Enter State' : ' '}
              error={parentState.length < 1 && parentStateEdit}
              required
              onBlur={() => setParentStateEdit(true)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip Code"
              onChange={(event) => setParentZipCode(event.target.value)}
              value={parentZipCode}
              errorText={parentZipCode.length < 1 ? 'Enter Zip Code' : ' '}
              error={parentZipCode.length < 1 && parentZipCodeEdit}
              required
              onBlur={() => setParentZipCodeEdit(true)}
            />
          </Grid>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

EditStudentInfoModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
  isParent: false,
};
