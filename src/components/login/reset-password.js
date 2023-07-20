import React from 'react';
import { Box } from '@mui/system';
import { validate } from 'validate.js';
import { Button, TextField } from '@mui/material';
import { flattenDeep } from 'lodash';

import { Layout } from '../layout/layout';
import {
  uppercaseLetter,
  lowercaseLetter,
  number,
  specialCharacter,
  firstIsCapital,
} from '../shared/validation-regexes';
import { resetPassword } from '../../services/users/users';

export function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordEdit, setPasswordEdit] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordEdit, setConfirmPasswordEdit] = React.useState(false);
  const token = localStorage.getItem('token');

  validate.validators.lowercaseLetter = lowercaseLetter;
  validate.validators.specialCharacter = specialCharacter;
  validate.validators.number = number;
  validate.validators.uppercaseLetter = uppercaseLetter;
  validate.validators.firstIsCapital = firstIsCapital;

  const validator = validate(
    { password, confirmPassword, email },
    {
      password: {
        presence: { allowEmpty: false, message: ' ' },
        length: { minimum: 12, message: 'must be at least 12 characters' },
        lowercaseLetter: {},
        specialCharacter: {},
        uppercaseLetter: {},
        number: {},
      },
      confirmPassword: {
        presence: { allowEmpty: false, message: ' ' },
        equality: 'password',
      },
      email: {
        presence: { allowEmpty: false, message: ' ' },
        email: true,
      },
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

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

  const submitAction = async () => {
    const data = { token, email, password, confirmPassword };
    await resetPassword(data);
  };
  return (
    <Layout title="Reset Password">
      <Box sx={{ width: '100%' }}>
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
        <TextField
          sx={{ margin: 5, width: '85%' }}
          onChange={(event) => setPassword(event.target.value)}
          helperText={displayErrorMessages('password')}
          error={checkError('password') && passwordEdit}
          label="Password"
          value={password}
          type="text"
          onBlur={() => setPasswordEdit(true)}
        />
        <TextField
          sx={{ margin: 5, width: '85%' }}
          onChange={(event) => setConfirmPassword(event.target.value)}
          helperText={displayErrorMessages('confirmPassword')}
          error={checkError('confirmPassword') && confirmPasswordEdit}
          label="Confirm Password"
          value={confirmPassword}
          type="text"
          onBlur={() => setConfirmPasswordEdit(true)}
        />
        <Button disabled={actionButtonDisabled} onClick={submitAction}>
          {' '}
          Reset{' '}
        </Button>
      </Box>
    </Layout>
  );
}
