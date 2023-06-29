import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import GenericModal from '../coaches/modal-component';
import { addAdminHandler } from './adminHandlers';

export function AddAdminModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validator = validate(
    { email, password, confirmPassword },
    {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
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
        presence: true,
        equality: 'password',
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const submitAction = () => {
    addAdminHandler(email, password, confirmPassword);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const cancelAction = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add a Coach"
      modalMessage="Fill out the fields below to add a coach."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={cancelAction}
      onIconButtonClick={cancelAction}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
              label="Email"
              value={email}
              type="email"
            />
            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              value={password}
              type="password"
            />
            <TextField
              fullWidth
              onChange={(event) => setConfirmPassword(event.target.value)}
              label="Confirm Password"
              value={confirmPassword}
              type="password"
            />
          </Stack>
        </Grid>
        {messages.length > 0 && (
          <Grid item xs={9}>
            {messages.map((message, index) => (
              <Typography key={index.id} variant="body2" color="error">
                {message}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </GenericModal>
  );
}
