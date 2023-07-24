import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { validate } from 'validate.js';
import { flattenDeep, set } from 'lodash';

import GenericModal from '../shared/generic-modal';
import { requestPasswordReset } from '../../services/users/users';
import { LayoutError } from '../layout/layout-error/layout-error';

export function ForgotPasswordModal(props) {
  const { onError } = props;
  const [email, setEmail] = React.useState('');
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  const validator = validate(
    { email },
    {
      email: {
        email: true,
        presence: { allowEmpty: false, message: ' ' },
        // inclusion: {
        //   within: coachEmailList(
        //     activeCoach,
        //     inactiveCoach,
        //     activeAdmin,
        //     inactiveAdmin
        //   ),
        //   message: 'This email is not used',
        // },
      },
    },
    { fullMessages: false }
  );

  useEffect(() => {
    setOpen(false);
  }, []);

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
  const submitAction = async () => {
    const data = { email };
    setToken('');

    try {
      setError('');
      const response = await requestPasswordReset(data);
      const unslicedToken = response.data['Return URL'];
      setToken(unslicedToken.slice('51'));
      localStorage.setItem('token', token);
      console.log(token);
      console.log('http://localhost:8080/reset-password');
      setEmail('');
      setEmailEdit(false);
      setOpen(true);
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        setError(
          'The provided email may be misspelled. Please check and try again.'
        );
      } else {
        setError('An unknown error occurred. Please try again later.');
      }

      setEmail('');
      setEmailEdit(false);
    }
  };
  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

  if (error) onError(error);
  return (
    <React.Fragment>
      <GenericModal
        openModal={<Button variant="text">Forgot Password?</Button>}
        modalHeadingTitle="Forgot Password"
        actionButtonTitle="Send Email"
        cancelButtonTitle="Cancel"
        actionButtonColor="submit"
        actionButtonDisabled={actionButtonDisabled}
        onActionButtonClick={submitAction}
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
      {open && (
        <Grid>
          <Grid item xs={1}>
            <Typography>Success, Check Your Email !</Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
