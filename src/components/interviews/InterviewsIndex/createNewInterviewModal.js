import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import GenericModal from '../../shared/generic-modal';
import {
  lowercaseLetter,
  uppercaseLetter,
  number,
  specialCharacter,
} from '../../shared/validation-regexes';
import { addInterviewHandler } from '../interviewsHandler';

export function CreateInterviewModal(props) {
  const { onSubmit } = props;
  const [name, setName] = useState('');

  validate.validators.uppercaseLetter = uppercaseLetter;
  validate.validators.lowercaseLetter = lowercaseLetter;
  validate.validators.number = number;
  validate.validators.specialCharacter = specialCharacter;

  const validator = validate(
    { name },
    {
      name: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
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

  const reset = () => {
    setName('');
  };

  const submitAction = async () => {
    await addInterviewHandler(name);
    onSubmit();
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalHeadingTitle="Create a new Interview"
      modalMessage="Enter a name for the interview."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onModalOpen={reset}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9} height={100}>
          <TextField
            fullWidth
            onChange={(event) => setName(event.target.value)}
            label="Interview Name"
            value={name}
            helperText={displayErrorMessages('name')}
            required
            type="text"
            sx={{ my: 1 }}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

CreateInterviewModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
