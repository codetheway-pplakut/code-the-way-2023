import React from 'react';
import { Button, TextField } from '@mui/material';
import { validate } from 'validate.js';
import GenericModal from '../shared/generic-modal';

export function ForgotPasswordModal() {
  const [email, setEmail] = React.useState('');
  const [emailEdit, setEmailEdit] = React.useState(false);

  const validator = validate(
    { email },
    {
      email: { email: true, presence: { allowEmpty: false, message: ' ' } },
    },
    { fullMessages: false }
  );

  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(' '); // Concatenate error messages with a space
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
      openModal={<Button variant="contained">Forgot Password</Button>}
      modalHeadingTitle="Forgot Password"
      actionButtonTitle="Send Email"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
    >
      <TextField
        sx={{ margin: 5, width: '85%' }}
        onChange={(event) => setEmail(event.target.value)}
        helperText={displayErrorMessages('email')}
        error={checkError('email') && emailEdit}
        label="Email"
        value={email}
        type="text"
        onBlur={() => setEmailEdit(true)}
      />
    </GenericModal>
  );
}
