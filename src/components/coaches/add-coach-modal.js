import { flattenDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import GenericModal from '../shared/generic-modal';
import {
  addCoachHandler,
  getActiveCoachesHandler,
  getInactiveCoachesHandler,
} from './coachHandlers';
import {
  getActiveAdminsHandler,
  getInactiveAdminsHandler,
} from '../admin/adminHandlers';
import {
  uppercaseLetter,
  lowercaseLetter,
  number,
  specialCharacter,
  firstIsCapital,
} from '../shared/validation-regexes';

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

  validate.validators.lowercaseLetter = lowercaseLetter;
  validate.validators.specialCharacter = specialCharacter;
  validate.validators.number = number;
  validate.validators.uppercaseLetter = uppercaseLetter;
  validate.validators.firstIsCapital = firstIsCapital;

  const validator = validate(
    { firstName, lastName, email, phone, password, confirmPassword },
    {
      firstName: {
        presence: { allowEmpty: false, message: 'Must not be blank.' },
        firstIsCapital: {},
      },
      lastName: {
        presence: { allowEmpty: false, message: 'Must not be blank.' },
        firstIsCapital: {},
      },
      email: {
        exclusion: {
          within: coachEmailList(
            activeCoach,
            inactiveCoach,
            activeAdmin,
            inactiveAdmin
          ),
          message: 'This email is used',
        },
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      phone: {
        presence: { allowEmpty: false, message: 'Must not be blank.' },
        format: {
          pattern: '^([0-9]{3}){1}[-. ]?([0-9]{3}){1}[-. ]?([0-9]{4}){1}',
          message: 'Format: ###-###-####',
        },
      },
      password: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
        length: { minimum: 12, message: 'must be at least 12 characters' },
        lowercaseLetter: {},
        specialCharacter: {},
        uppercaseLetter: {},
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

  const reset = () => {
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
  };

  const actionButtonDisabled = Boolean(messages.length);

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
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Add a Coach"
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onModalOpen={reset}
    >
      <Grid container justifyContent="center" padding={4}>
        <Grid item container direction="row" xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              onChange={(event) => setFirstName(event.target.value)}
              label="First Name"
              value={firstName}
              helperText={displayErrorMessages('firstName')}
              error={checkError('firstName') && firstNameEdit}
              required
              type="text"
              onBlur={() => setFirstNameEdit(true)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              onChange={(event) => setLastName(event.target.value)}
              label="Last Name"
              value={lastName}
              helperText={displayErrorMessages('lastName')}
              error={checkError('lastName') && lastNameEdit}
              required
              type="text"
              onBlur={() => setLastNameEdit(true)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
