import React from 'react';
import { Box } from '@mui/system';
import { validate } from 'validate.js';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { flattenDeep } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { pink } from '@mui/material/colors';
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
  const url = window.location.href;
  const [token, setToken] = React.useState(url.split('token=')[1]);
  const [tokenEdit, setTokenEdit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const showErrorMessage = Boolean(errorMessage);

  validate.validators.lowercaseLetter = lowercaseLetter;
  validate.validators.specialCharacter = specialCharacter;
  validate.validators.number = number;
  validate.validators.uppercaseLetter = uppercaseLetter;
  validate.validators.firstIsCapital = firstIsCapital;

  const navigate = useNavigate();

  const validator = validate(
    { password, confirmPassword, email, token },
    {
      token: {
        presence: { allowEmpty: false, message: ' ' },
      },
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
    try {
      setErrorMessage('');
      await resetPassword(data);
      navigate('/');
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        setErrorMessage(
          'The provided email may be misspelled. Please check and try again.'
        );
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    }
    setToken('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setTokenEdit(false);
    setEmailEdit(false);
    setPasswordEdit(false);
    setConfirmPasswordEdit(false);
  };
  return (
    <Layout title="Reset Password">
      <Box sx={{ width: '100%' }}>
        <Grid container direction="column">
          {showErrorMessage && (
            <Typography sx={{ mt: '5vh', color: pink[500] }}>
              {errorMessage}
            </Typography>
          )}
          <Grid item>
            <TextField
              sx={{ margin: 2, width: '85%' }}
              onChange={(event) => setEmail(event.target.value)}
              helperText={displayErrorMessages('email')}
              error={checkError('email') && emailEdit}
              label="Email"
              value={email}
              type="text"
              onBlur={() => setEmailEdit(true)}
            />
          </Grid>
          <Grid item>
            <TextField
              hidden
              sx={{ margin: 2, width: '85%' }}
              onChange={(event) => setPassword(event.target.value)}
              helperText={displayErrorMessages('password')}
              error={checkError('password') && passwordEdit}
              label="Password"
              value={password}
              type="password"
              onBlur={() => setPasswordEdit(true)}
            />
          </Grid>
          <Grid item>
            <TextField
              hidden
              sx={{ margin: 2, width: '85%' }}
              onChange={(event) => setConfirmPassword(event.target.value)}
              helperText={displayErrorMessages('confirmPassword')}
              error={checkError('confirmPassword') && confirmPasswordEdit}
              label="Confirm Password"
              value={confirmPassword}
              type="password"
              onBlur={() => setConfirmPasswordEdit(true)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={actionButtonDisabled}
              onClick={submitAction}
              sx={{ width: '85%' }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
