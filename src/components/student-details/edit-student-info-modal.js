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
    setParentFirstName(student.parentFirstName);
    setParentLastName(student.parentLastName);
    setParentCellPhone(student.parentCellPhone);
    setParentEmail(student.parentEmail);
    setParentAddress(student.address);
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
  student: PropTypes.func,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
  isParent: false,
};
