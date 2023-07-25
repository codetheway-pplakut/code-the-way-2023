import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';
import { useNavigate } from 'react-router-dom';
import { flattenDeep } from 'lodash';
import GenericModal from '../shared/generic-modal';
import { getInterviewsHandler } from '../interviews/interviewsHandler';

export function ChooseInterviewModal(props) {
  const { studentId } = props;
  const [interviews, setInterviews] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const handleInterviewChange = (event) => {
    setValue(event.target.value);
  };

  const requestActiveCoaches = async () => {
    const response = await getInterviewsHandler();
    const { data } = response;
    setInterviews(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const validator = validate(
    { value },
    {
      value: {
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
  const actionButtonDisabled = Boolean(messages.length);
  const content = (
    <TextField
      id="coach-select"
      select
      label="Interview"
      value={value}
      onChange={handleInterviewChange}
      disabled={interviews.length === 0}
      fullWidth
      helperText={displayErrorMessages('name')}
      required
      type="text"
      sx={{ my: 1 }}
    >
      {interviews && interviews.length > 0 ? (
        interviews.map((val) => (
          <MenuItem key={val.id} value={val.id}>
            {val.interviewName}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No Interviews available</MenuItem>
      )}
    </TextField>
  );

  return (
    <GenericModal
      openModal="Interview"
      modalHeadingTitle="Start an Interview"
      modalMessage={content}
      actionButtonTitle="Start Interview"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={() =>
        navigate('/AnswerInterview', {
          state: {
            studentId,
            interviewId: value,
            interviewName: interviews.find(
              (interview) => interview.id === value
            ).interviewName,
          },
        })
      }
      onModalOpen={() => {
        setValue();
      }}
    />
  );
}

ChooseInterviewModal.propTypes = {
  studentId: PropTypes.string.isRequired,
};
