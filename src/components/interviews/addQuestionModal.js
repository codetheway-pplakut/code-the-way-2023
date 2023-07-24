import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import uuid from 'react-uuid';
import GenericModal from '../shared/generic-modal';
import { editInterviewHandler } from './interviewsHandler';

// import { TextFieldWithErrorMessage } from '../../shared/text-field-with-error-message';

export default function AddQuestionModal(props) {
  const { interviewName, interviewId } = props;
  const { questions } = props;
  console.log(questions);
  console.log(interviewName);
  console.log(interviewId);
  const [question, setQuestion] = useState('');

  const validator = validate(
    { question },
    {
      question: {
        presence: { allowEmpty: false, message: 'Must not be blank' },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length);

  const reset = () => {
    setQuestion('');
  };

  const requestSave = async () => {
    console.log('blah');
    try {
      const id = uuid();
      const questionObject = {
        questionString: question,
        id,
        questionInInterviews: [
          {
            interviewId,
            questionId: id,
            questionOrder:
              questions[questions.length - 1].questionInInterviews[0]
                .questionOrder + 1,
          },
        ],
      };
      console.log(questions);
      const newQuestions = [...questions, questionObject];
      console.log(newQuestions);
      await editInterviewHandler(questions, interviewName, id);
    } catch (error) {
      console.log(error);
    }
  };
  const displayErrorMessages = (field) => {
    const errors = validator && validator[field];
    if (errors && errors.length > 0) {
      return errors.join(', '); // Concatenate error messages with a comma and space
    }
    return ' ';
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
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Communication"
      onActionButtonClick={requestSave}
      actionButtonDisabled={actionButtonDisabled}
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      actionButtonColor="submit"
      onModalOpen={reset}
    >
      <Grid container alignItems="center" px={4} py={2} spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Question Text"
            onChange={(event) => setQuestion(event.target.value)}
            value={question}
            helperText={displayErrorMessages('question')}
            error={checkError('question')}
            required
            multiline
            fullWidth
            minRows={2}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddQuestionModal.propTypes = {
  questions: PropTypes.array,
  interviewName: PropTypes.string.isRequired,
  interviewId: PropTypes.string.isRequired,
};

AddQuestionModal.defaultProps = {
  questions: [],
};
