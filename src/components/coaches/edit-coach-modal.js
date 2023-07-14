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
        presence: { allowEmpty: false, message: '' },
      },
      lastName: {
        presence: { allowEmpty: false },
      },
      email: {
        presence: { allowEmpty: false },
        email: true,
      },
      phone: {
        presence: { allowEmpty: false },
        format: {
          pattern: '^([0-9]{3}){1}[-. ]?([0-9]{3}){1}[-. ]?([0-9]{4}){1}',
        },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

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
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');

    setFirstNameEdit(false);
    setLastNameEdit(false);
    setEmailEdit(false);
    setPhoneEdit(false);
  };

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="outlined"
          label="First Name"
          defaultValue={firstName}
          errorText={firstName.length < 1 ? 'Enter First Name' : ' '}
          error={firstName.length < 1 && firstNameEdit}
          required
          sx={{ my: 1 }}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          onBlur={() => setFirstNameEdit(true)}
        />
        <TextField
          id="outlined"
          label="Last Name"
          defaultValue={lastName}
          errorText={lastName.length < 1 ? 'Enter Last Name' : ' '}
          error={lastName.length < 1 && lastNameEdit}
          required
          sx={{ my: 1 }}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          onBlur={() => setLastNameEdit(true)}
        />
        <TextField
          id="outlined"
          label="Email"
          error={!email.includes('@') && emailEdit}
          errorText={!email.includes('@') ? 'Must contain an @ sign.' : ' '}
          required
          defaultValue={email}
          sx={{ my: 1 }}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          onBlur={() => setEmailEdit(true)}
        />
        <TextField
          id="outlined"
          label="Phone Number"
          required
          error={phone.length < 1 && phoneEdit}
          errorText={phone.length < 1 ? 'Enter Phone Number' : ' '}
          defaultValue={phone}
          sx={{ my: 1 }}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          onBlur={() => setPhoneEdit(true)}
        />
      </div>
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
      onCancelButtonClick={cancelAction}
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
