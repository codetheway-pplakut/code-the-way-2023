import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { GenericModal } from '../shared/generic-modal';
import { addCoachHandler } from './coachHandlers';

export function AddCoachModal(props) {
  const { onSubmit } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  // If fields are edited, these are set to true and allow the error state
  const [firstNameEdit, setFirstNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [confirmPasswordEdit, setConfirmPasswordEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const validator = validate(
    { firstName, lastName, email, phone, password, confirmPassword },
    {
      firstName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      lastName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      email: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      phone: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{3}){1}[-. ]?([0-9]{3}){1}[-. ]?([0-9]{4}){1}',
          message: 'Format: XXX-XXX-XXXX',
        },
      },
      password: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*',
          message:
            'Must contain at least one number, one lowercase letter, one uppercase letter, and one special character',
        },
        length: {
          minimum: 12,
          message: 'Must be at least 12 characters',
        },
      },

      confirmPassword: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        equality: 'password',
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const closeAction = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setConfirmPassword('');
    setPassword('');
    console.log(messages);
    setFirstNameEdit(false);
    setLastNameEdit(false);
    setEmailEdit(false);
    setPhoneEdit(false);
    setConfirmPasswordEdit(false);
    setPasswordEdit(false);
  };

  const submitAction = async () => {
    await addCoachHandler(
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    );
    onSubmit();
    closeAction();
  };

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

  return (
    <GenericModal
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Add a Coach"
      modalMessage="Fill out the fields below to add a coach."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={closeAction}
      onIconButtonClick={closeAction}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            onChange={(event) => setFirstName(event.target.value)}
            label="First Name"
            value={firstName}
            helperText={displayErrorMessages('firstName')}
            error={checkError('firstName') && firstNameEdit}
            required
            type="text"
            sx={{ my: 1 }}
            onBlur={() => setFirstNameEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setLastName(event.target.value)}
            label="Last Name"
            value={lastName}
            helperText={displayErrorMessages('lastName')}
            error={checkError('lastName') && lastNameEdit}
            required
            type="text"
            sx={{ my: 1 }}
            onBlur={() => setLastNameEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            value={email}
            error={checkError('email') && emailEdit}
            helperText={displayErrorMessages('email')}
            required
            type="email"
            sx={{ my: 1 }}
            onBlur={() => setEmailEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setPhone(event.target.value)}
            label="Phone Number"
            value={phone}
            required
            error={checkError('phone') && phoneEdit}
            helperText={displayErrorMessages('phone')}
            type="text"
            sx={{ my: 1 }}
            onBlur={() => setPhoneEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            value={password}
            error={checkError('password') && passwordEdit}
            helperText={displayErrorMessages('password')}
            required
            type="password"
            sx={{ my: 1 }}
            onBlur={() => setPasswordEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setConfirmPassword(event.target.value)}
            label="Confirm Password"
            value={confirmPassword}
            error={checkError('confirmPassword') && confirmPasswordEdit}
            required
            type="password"
            sx={{ my: 1 }}
            onBlur={() => setConfirmPasswordEdit(true)}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddCoachModal.propTypes = {
  onSubmit: PropTypes.func,
};

AddCoachModal.defaultProps = {
  onSubmit: null,
};
