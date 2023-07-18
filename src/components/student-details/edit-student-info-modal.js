import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import { HdrAutoOutlined } from '@mui/icons-material';

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
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      studentLastName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      studentEmail: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      studentCellPhone: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{3}){1}[-]([0-9]{3}){1}[-]([0-9]{4}){1}',
          message: 'Format: XXX-XXX-XXXX',
        },
      },
      dateOfBirth: {},
      studentAddress: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      studentApartmentNumber: {
        // presence: { allowEmpty: true },
      },
      studentCity: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      studentState: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      studentZipCode: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{5}){1}',
          message: 'Must be Valid Zip Code',
        },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);

  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return null;
  };
  const checkError = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return true;
    }
    return false;
  };
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

  const handleClose = () => {
    setStudentFirstName(student.studentFirstName);
    setStudentLastName(student.studentLastName);
    setStudentCellPhone(student.studentCellPhone);
    setStudentEmail(student.studentEmail);
    setStudentAddress(student.studentAddress);
    setStudentApartmentNumber(student.studentApartmentNumber);
    setStudentCity(student.studentCity);
    setStudentState(student.studentState);
    setStudentZipCode(student.studentZipCode);

    setStudentFirstNameEdit(false);
    setStudentLastNameEdit(false);
    setStudentCellPhoneEdit(false);
    setStudentEmailEdit(false);
    setStudentAddressEdit(false);
    setStudentApartmentNumberEdit(false);
    setStudentCityEdit(false);
    setStudentStateEdit(false);
    setStudentZipCodeEdit(false);
    setStudentDateOfBirthEdit(false);
  };
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      actionButtonDisabled={actionButtonDisabled}
      onModalOpen={handleClose}
      openModal={<EditIcon />}
      actionButtonColor="submit"
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              onChange={(event) => setStudentFirstName(event.target.value)}
              value={studentFirstName}
              helperText={displayErrorMessages('studentFirstName')}
              error={checkError('studentFirstName') && studentFirstNameEdit}
              onBlur={() => setStudentFirstNameEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={(event) => setStudentLastName(event.target.value)}
              value={studentLastName}
              helperText={displayErrorMessages('studentLastName')}
              error={checkError('studentLastName') && studentLastNameEdit}
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
            helperText={displayErrorMessages('studentCellPhone')}
            error={checkError('studentCellPhone') && studentCellPhoneEdit}
            onBlur={() => setStudentCellPhoneEdit(true)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            onChange={(event) => setStudentEmail(event.target.value)}
            value={studentEmail}
            helperText={displayErrorMessages('studentEmail')}
            error={checkError('studentEmail') && studentEmailEdit}
            onBlur={() => setStudentEmailEdit(true)}
            required
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Address"
              onChange={(event) => setStudentAddress(event.target.value)}
              value={studentAddress}
              helperText={displayErrorMessages('studentAddress')}
              error={checkError('studentAddress') && studentAddressEdit}
              onBlur={() => setStudentAddressEdit(true)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apt."
              onChange={(event) =>
                setStudentApartmentNumber(event.target.value)
              }
              value={studentApartmentNumber}
              onBlur={() => setStudentApartmentNumberEdit(true)}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="City"
              onChange={(event) => setStudentCity(event.target.value)}
              value={studentCity}
              helperText={displayErrorMessages('studentCity')}
              error={checkError('studentCity') && studentCityEdit}
              onBlur={() => setStudentCityEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="State"
              onChange={(event) => setStudentState(event.target.value)}
              value={studentState}
              helperText={displayErrorMessages('studentState')}
              error={checkError('studentState') && studentStateEdit}
              onBlur={() => setStudentStateEdit(true)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip Code"
              onChange={(event) => setStudentZipCode(event.target.value)}
              value={studentZipCode}
              helperText={displayErrorMessages('studentZipCode')}
              error={checkError('studentZipCode') && studentZipCodeEdit}
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
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      parentLastName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      parentEmail: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      parentCellPhone: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})',
          message: 'Format: XXX-XXX-XXXX',
        },
      },
      parentAddress: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },

      parentCity: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      parentState: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      parentZipCode: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{5}){1}',
          message: 'Must be Valid Zip Code',
        },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return null;
  };

  const checkError = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return true;
    }
    return false;
  };
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

  const handleClose = () => {
    setParentFirstName(student.parentFirstName);
    setParentLastName(student.parentLastName);
    setParentCellPhone(student.parentCellPhone);
    setParentEmail(student.parentEmail);
    setParentAddress(student.address);
    setParentApartmentNumber(student.parentApartmentNumber);
    setParentCity(student.parentCity);
    setParentState(student.parentState);
    setParentZipCode(student.parentZipCode);

    setParentFirstNameEdit(false);
    setParentLastNameEdit(false);
    setParentCellPhoneEdit(false);
    setParentEmailEdit(false);
    setParentAddressEdit(false);
    setParentApartmentNumberEdit(false);
    setParentCityEdit(false);
    setParentStateEdit(false);
    setParentZipCodeEdit(false);
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      modalMessage="Fill out the fields below to save."
      actionButtonColor="submit"
      onActionButtonClick={requestSave}
      onModalOpen={handleClose}
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
              helperText={displayErrorMessages('parentFirstName')}
              error={checkError('parentFirstName') && parentFirstNameEdit}
              required
              onBlur={() => setParentFirstNameEdit(true)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={(event) => setParentLastName(event.target.value)}
              value={parentLastName}
              helperText={displayErrorMessages('parentLastName')}
              error={checkError('parentLastName') && parentLastNameEdit}
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
            helperText={displayErrorMessages('parentCellPhone')}
            error={checkError('parentCellPhone') && parentCellPhoneEdit}
            required
            onBlur={() => setParentCellPhoneEdit(true)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            onChange={(event) => setParentEmail(event.target.value)}
            value={parentEmail}
            helperText={displayErrorMessages('parentEmail')}
            error={checkError('parentEmail') && parentEmailEdit}
            required
            onBlur={() => setParentEmailEdit(true)}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Address"
              onChange={(event) => setParentAddress(event.target.value)}
              value={parentAddress}
              helperText={displayErrorMessages('parentAddress')}
              error={checkError('parentAddress') && parentAddressEdit}
              required
              onBlur={() => setParentAddressEdit(true)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apt."
              onChange={(event) => setParentApartmentNumber(event.target.value)}
              value={parentApartmentNumber}
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
              helperText={displayErrorMessages('parentCity')}
              error={checkError('parentCity') && parentCityEdit}
              required
              onBlur={() => setParentCityEdit(true)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="State"
              onChange={(event) => setParentState(event.target.value)}
              value={parentState}
              helperText={displayErrorMessages('parentState')}
              error={checkError('parentState') && parentStateEdit}
              required
              onBlur={() => setParentStateEdit(true)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip Code"
              onChange={(event) => setParentZipCode(event.target.value)}
              value={parentZipCode}
              helperText={displayErrorMessages('parentZipCode')}
              error={checkError('parentZipCode') && parentZipCodeEdit}
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
