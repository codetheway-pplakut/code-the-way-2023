import { flattenDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { GenericModal } from '../shared/generic-modal';
import {
  lowercaseLetter,
  uppercaseLetter,
  number,
  specialCharacter,
} from '../shared/validation-regexes';
import {
  addAdminHandler,
  getActiveAdminsHandler,
  getInactiveAdminsHandler,
} from './adminHandlers';
import {
  getActiveCoachesHandler,
  getInactiveCoachesHandler,
} from '../coaches/coachHandlers';

export function AddAdminModal(props) {
  const { onSubmit } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [confirmPasswordEdit, setConfirmPasswordEdit] = useState(false);

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

  useEffect(() => {
    requestActiveCoaches();
    requestInactiveCoaches();
    requestActiveAdmins();
    requestInactiveAdmins();
  }, []);

  const coachEmailList = (arr1, arr2, arr3, arr4) => {
    const value1 = arr1.map((val) => val.coachEmail);
    const value2 = arr2.map((val) => val.coachEmail);
    const value3 = arr3.map((val) => val.email);
    const value4 = arr4.map((val) => val.email);
    const finalValue = flattenDeep([value1, value2, value3, value4]);
    return finalValue;
  };

  validate.validators.uppercaseLetter = uppercaseLetter;
  validate.validators.lowercaseLetter = lowercaseLetter;
  validate.validators.number = number;
  validate.validators.specialCharacter = specialCharacter;

  const validator = validate(
    { email, password, confirmPassword },
    {
      email: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        exclusion: {
          within: coachEmailList(
            activeCoach,
            inactiveCoach,
            activeAdmin,
            inactiveAdmin
          ),
          message: 'This email is used',
        },
        email: true,
      },
      password: {
        presence: { allowEmpty: false, message: ' ' },
        length: {
          minimum: 12,
          message: 'Must be at least 12 characters,',
        },
        uppercaseLetter: {},
        lowercaseLetter: {},
        specialCharacter: {},

        number: {},
      },
      confirmPassword: {
        presence: { allowEmpty: false, message: 'Must not be blank.' },
        equality: 'password',
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
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

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setEmailEdit(false);
    setPasswordEdit(false);
    setConfirmPasswordEdit(false);
  };

  const submitAction = async () => {
    await addAdminHandler(email, password, confirmPassword);
    if (onSubmit) onSubmit();
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Add an Admin"
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onModalOpen={reset}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} px={4} py={2}>
          <Grid item height={90}>
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
          </Grid>
          <Grid item height={100}>
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
          </Grid>
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
