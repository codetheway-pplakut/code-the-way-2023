import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { GenericModal } from '../shared/generic-modal';
import { getInterviewsHandler } from '../interviews/interviewsHandler';

export function ChooseInterviewModal(props) {
  const { studentId } = props;
  const [interviews, setInterviews] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  const onSubmit = async () => {};

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

  const content = (
    <TextField
      id="coach-select"
      select
      label="Interview"
      value={value}
      onChange={handleInterviewChange}
      disabled={interviews.length === 0}
      width="100%"
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
