import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { GenericModal } from '../shared/generic-modal';
import { addAdminHandler } from './adminHandlers';

export function AddAdminModal(props) {
  const { onSubmit } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [confirmPasswordEdit, setConfirmPasswordEdit] = useState(false);

  const validator = validate(
    { email, password, confirmPassword },
    {
      email: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      password: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*',
          message:
            'must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        },
        length: {
          minimum: 12,
          message: 'must be at least 12 characters',
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
  const closeAction = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setEmailEdit(false);
    setPasswordEdit(false);
    setConfirmPasswordEdit(false);
  };

  const submitAction = async () => {
    await addAdminHandler(email, password, confirmPassword);
    closeAction();
    if (onSubmit) onSubmit();
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Add an Admin"
      modalMessage="Fill out the fields below to add an admin."
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
            type="password"
            error={checkError('confirmPassword') && confirmPasswordEdit}
            required
            sx={{ my: 1 }}
            onBlur={() => setConfirmPasswordEdit(true)}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddAdminModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
