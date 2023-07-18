import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { flattenDeep } from 'lodash';
import { validate } from 'validate.js';
import { GenericModal } from '../shared/generic-modal';
import { editCoachHandler } from './coachHandlers';

export function EditCoachModal(props) {
  const { coachId, coach, onCoachEdit } = props;

  const [firstName, setFirstName] = useState(coach.coachFirstName);
  const [lastName, setLastName] = useState(coach.coachLastName);
  const [email, setEmail] = useState(coach.coachEmail);
  const [phone, setPhone] = useState(coach.coachPhoneNumber);

  const [firstNameEdit, setFirstNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);

  const validator = validate(
    { firstName, lastName, email, phone },
    {
      firstName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      lastName: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      email: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        email: true,
      },
      phone: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
        format: {
          pattern: '^([0-9]{3}){1}[-. ]?([0-9]{3}){1}[-. ]?([0-9]{4}){1}',
          message: 'Format: XXX-XXX-XXXX',
        },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

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
  const submitAction = async () => {
    try {
      await editCoachHandler(
        coachId,
        coach.userId,
        firstName,
        lastName,
        email,
        phone,
        coach.active
      );
    } catch (error) {
      console.log(error);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');

    setFirstNameEdit(false);
    setLastNameEdit(false);
    setEmailEdit(false);
    setPhoneEdit(false);

    onCoachEdit();
  };

  const cancelAction = () => {
    setFirstName(coach.coachFirstName);
    setLastName(coach.coachLastName);
    setEmail(coach.coachEmail);
    setPhone(coach.coachPhoneNumber);

    setFirstNameEdit(false);
    setLastNameEdit(false);
    setEmailEdit(false);
    setPhoneEdit(false);
  };

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <Grid item container direction="row" spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined"
            label="First Name"
            defaultValue={firstName}
            helperText={displayErrorMessages('firstName')}
            error={checkError('firstName') && firstNameEdit}
            required
            sx={{ my: 1 }}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            onBlur={() => setFirstNameEdit(true)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined"
            label="Last Name"
            defaultValue={lastName}
            helperText={displayErrorMessages('lastName')}
            error={checkError('lastName') && lastNameEdit}
            required
            sx={{ my: 1 }}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            onBlur={() => setLastNameEdit(true)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined"
          label="Email"
          error={checkError('email') && emailEdit}
          helperText={displayErrorMessages('email')}
          required
          defaultValue={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          onBlur={() => setEmailEdit(true)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined"
          label="Phone Number"
          required
          error={checkError('phone') && phoneEdit}
          helperText={displayErrorMessages('phone')}
          defaultValue={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          onBlur={() => setPhoneEdit(true)}
        />
      </Grid>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Edit Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      actionButtonDisabled={actionButtonDisabled}
      onModalOpen={cancelAction}
    />
  );
}

EditCoachModal.propTypes = {
  coachId: PropTypes.string.isRequired,
  coach: PropTypes.object.isRequired,
  onCoachEdit: PropTypes.func,
};

EditCoachModal.defaultProps = {
  onCoachEdit: null,
};
