import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import GenericModal from '../shared/generic-modal';
import { requestPasswordReset } from '../../services/users/users';
import {
  getActiveAdminsHandler,
  getInactiveAdminsHandler,
} from '../admin/adminHandlers';
import {
  getActiveCoachesHandler,
  getInactiveCoachesHandler,
} from '../coaches/coachHandlers';

export function ForgotPasswordModal() {
  const [email, setEmail] = React.useState('');
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [activeCoach, setActiveCoach] = useState([]);
  const [inactiveCoach, setInactiveCoach] = useState([]);
  const [activeAdmin, setActiveAdmin] = useState([]);
  const [inactiveAdmin, setInactiveAdmin] = useState([]);

  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoach(data);
  };

  const requestInactiveCoaches = async () => {
    const response = await getInactiveCoachesHandler();
    const { data } = response;
    setInactiveCoach(data);
  };

  const requestActiveAdmins = async () => {
    const response = await getActiveAdminsHandler();
    const { data } = response;
    setActiveAdmin(data);
  };

  const requestInactiveAdmins = async () => {
    const response = await getInactiveAdminsHandler();
    const { data } = response;
    setInactiveAdmin(data);
  };

  const coachEmailList = (arr1, arr2, arr3, arr4) => {
    const value1 = arr1.map((val) => val.coachEmail);
    const value2 = arr2.map((val) => val.coachEmail);
    const value3 = arr3.map((val) => val.email);
    const value4 = arr4.map((val) => val.email);
    const finalValue = flattenDeep([value1, value2, value3, value4]);
    return finalValue;
  };

  useEffect(() => {
    requestActiveCoaches();
    requestInactiveCoaches();
    requestActiveAdmins();
    requestInactiveAdmins();
  }, []);
  const validator = validate(
    { email },
    {
      email: {
        email: true,
        presence: { allowEmpty: false, message: ' ' },
        inclusion: {
          within: coachEmailList(
            activeCoach,
            inactiveCoach,
            activeAdmin,
            inactiveAdmin
          ),
          message: 'This email is not used',
        },
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
  const submitAction = async () => {
    const data = { email };
    const response = await requestPasswordReset(data);
    const unslicedToken = response.data['Return URL'];
    setToken(unslicedToken.slice('51'));
    localStorage.setItem('token', token);
    console.log(token);
    console.log('http://localhost:8080/reset-password');
    setOpen(true);
  };
  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

  return (
    <React.Fragment>
      <GenericModal
        openModal={<Button variant="contained">Forgot Password</Button>}
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
      <Grid>
        <Grid item xs={1}>
          {' '}
          <Typography>{token}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
