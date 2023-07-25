import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GenericModal from '../../shared/generic-modal';
import { editQuestionHandler } from '../questionsHandler';
import { editInterviewHandler } from '../interviewsHandler';

export function EditInterviewModal(props) {
  const { interviewName, interviewId, onSubmit } = props;

  const [interviewNewName, setInterviewName] = useState(interviewName);

  const displayErrorMessages = () => {
    const errors = false;
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return null;
  };
  const submitAction = async () => {
    try {
      await editInterviewHandler(interviewNewName, interviewId);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <Grid item container direction="row" spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined"
            label="Interview Name"
            defaultValue={interviewNewName}
            helperText={displayErrorMessages('firstName')}
            required
            sx={{ my: 1 }}
            onChange={(event) => {
              setInterviewName(event.target.value);
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
