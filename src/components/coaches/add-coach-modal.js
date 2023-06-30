import React, { useState } from 'react';
import { Typography, Grid, Stack, TextField } from '@mui/material';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../shared/generic-modal';

export function AddCoachModal() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const validator = validate(
    { userName, password },
    {
      userName: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: 'must be at least 6 characters',
        },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  console.log('messages: ', messages);

  const submitAction = () => {
    alert('make api call here');
    setUserName('');
    setPassword('');
  };

  const cancelAction = () => {
    setUserName('');
    setPassword('');
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
              onChange={(event) => setUserName(event.target.value)}
              label="Username"
              value={userName}
              type="email"
            />
            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              value={password}
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
