import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { flattenDeep } from 'lodash';
import { validate } from 'validate.js';
import GenericModal from '../shared/generic-modal';
import { editQuestionHandler } from './questionsHandler';

export function EditQuestionModal(props) {
  const { question, onSubmit } = props;

  const [questionString, setQuestionString] = useState(question.questionString);
  const [questionOrder, setQuestionOrder] = useState(
    question.questionInInterviews[0].questionOrder
  );

  const displayErrorMessages = () => {
    const errors = false;
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return null;
  };
  const submitAction = async () => {
    try {
      const updatedQuestion = question;
      question.questionString = questionString;
      question.questionInInterviews[0].questionOrder = questionOrder;
      await editQuestionHandler(updatedQuestion);
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
            minRows={4}
            multiline
            label="Question"
            defaultValue={questionString}
            helperText={displayErrorMessages('firstName')}
            required
            sx={{ my: 1 }}
            onChange={(event) => {
              setQuestionString(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined"
            label="Question Number"
            required
            defaultValue={questionOrder}
            onChange={(event) => {
              setQuestionOrder(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Edit Question"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
    />
  );
}
PropTypes.EditQuestionModal = {
  question: PropTypes.object.isRequired,
};
