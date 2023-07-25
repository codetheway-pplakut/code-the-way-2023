import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { flattenDeep } from 'lodash';
import { validate } from 'validate.js';
import GenericModal from '../../shared/generic-modal';
import { editQuestionHandler } from '../questionsHandler';
import { editInterviewHandler } from '../interviewsHandler';

export function EditInterviewModal(props) {
  const { interviewName, interviewId, onSubmit } = props;

  const [interviewNewName, setInterviewNewName] = useState(interviewName);

  const submitAction = async () => {
    try {
      await editInterviewHandler(interviewNewName, interviewId);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };
  const validator = validate(
    { interviewNewName },
    {
      interviewNewName: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(' ');
    }
    return null;
  };

  const actionButtonDisabled = Boolean(messages.length);

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <Grid item container direction="row" spacing={2}>
        <Grid item xs={12} height={100}>
          <TextField
            fullWidth
            id="outlined"
            label="Interview Name"
            defaultValue={interviewNewName}
            helperText={displayErrorMessages('interviewNewName')}
            required
            sx={{ my: 1 }}
            onChange={(event) => {
              setInterviewNewName(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Edit Interview Name"
      modalMessage={content}
      actionButtonTitle="Save"
      actionButtonDisabled={actionButtonDisabled}
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
    />
  );
}
PropTypes.EditInterviewModal = {
  interviewName: PropTypes.string.isRequired,
  interviewId: PropTypes.string.isRequired,
};
