import React from 'react';
import { flattenDeep } from 'lodash';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validate } from 'validate.js';
import { firstIsCapital } from '../shared/validation-regexes';

import { addStudentHandler } from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function AddStudentModal(props) {
  const { onSubmit } = props;
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [email, setEmail] = React.useState('');
  const [cellPhone, setCellPhone] = React.useState('');

  const [firstNameEdit, setFirstNameEdit] = React.useState(false);
  const [lastNameEdit, setLastNameEdit] = React.useState(false);
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [cellPhoneEdit, setCellPhoneEdit] = React.useState(false);

  const [dateOfBirthError, setDateofBirthError] = React.useState(false);

  validate.validators.firstIsCapital = firstIsCapital;

  const validator = validate(
    { firstName, lastName, email, dateOfBirth, cellPhone },
    {
      firstName: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
        firstIsCapital: {},
      },
      lastName: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
        firstIsCapital: {},
      },
      email: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
        email: true,
      },
      cellPhone: {
        presence: { allowEmpty: true, message: 'Must not be blank' },
        format: {
          pattern: '^([0-9]{3}){1}[-]([0-9]{3}){1}[-]([0-9]{4}){1}',
          message: 'Format: ###-###-####',
        },
      },
      dateOfBirth: {},
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length || dateOfBirthError);

  const reset = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setDateOfBirth(new Date());
    setCellPhone('');

    setEmailEdit(false);
    setFirstNameEdit(false);
    setLastNameEdit(false);
    setCellPhoneEdit(false);
    setDateofBirthError(false);
  };

  const addStudentAction = async () => {
    await addStudentHandler(firstName, lastName, dateOfBirth, cellPhone, email);
    if (onSubmit) onSubmit();
  };

  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return null;
  };

  const minDate = dayjs().subtract(25, 'year');

  const checkError = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return true;
    }
    return false;
  };
  const content = (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item container direction="row" xs={12} spacing={2}>
        <Grid item xs={6} height={130}>
          <TextField
            label="First Name"
            margin="normal"
            size="large"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            sx={{ my: 1 }}
            helperText={displayErrorMessages('firstName')}
            error={checkError('firstName') && firstNameEdit}
            onBlur={() => setFirstNameEdit(true)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            margin="normal"
            size="large"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            sx={{ my: 1 }}
            helperText={displayErrorMessages('lastName')}
            error={checkError('lastName') && lastNameEdit}
            onBlur={() => setLastNameEdit(true)}
          />
        </Grid>
      </Grid>
      <Grid item container direction="row" xs={12}>
        <Grid item xs={12} height={95}>
          <TextField
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            helperText={displayErrorMessages('email')}
            error={checkError('email') && emailEdit}
            onBlur={() => setEmailEdit(true)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item container direction="row" xs={12} spacing={2}>
        <Grid item xs={6} mt="8px">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Birth"
              margin="normal"
              value={dayjs(dateOfBirth)}
              onChange={(newValue) => setDateOfBirth(newValue)}
              disableFuture
              minDate={minDate}
              onError={(error) => {
                setDateofBirthError(error !== null);
              }}
              slotProps={{
                textField: {
                  helperText: dateOfBirthError ? 'Invalid Date' : '',
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} height={100}>
          <TextField
            label="Phone"
            margin="normal"
            onChange={(event) => {
              setCellPhone(event.target.value);
            }}
            sx={{ my: 1 }}
            helperText={displayErrorMessages('cellPhone')}
            error={checkError('cellPhone') && cellPhoneEdit}
            onBlur={() => setCellPhoneEdit(true)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Add Student"
      modalMessage={content}
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Add"
      cancelButtonTitle="Cancel"
      onActionButtonClick={addStudentAction}
      actionButtonDisabled={actionButtonDisabled}
      onModalOpen={reset}
    />
  );
}
AddStudentModal.propTypes = {
  onSubmit: PropTypes.func,
};

AddStudentModal.defaultProps = {
  onSubmit: null,
};
