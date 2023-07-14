import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';
import { GenericModal } from '../../shared/generic-modal';
import { addCommunicationHandler } from './communicationsHandler';
import { getActiveCoachesHandler } from '../../coaches/coachHandlers';
// import { TextFieldWithErrorMessage } from '../../shared/text-field-with-error-message';

export default function AddCommunicationsModal(props) {
  const { student } = props;

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [coachId, setCoachId] = useState('');
  const [activeCoaches, setActiveCoaches] = React.useState([]);

  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoaches(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const studentId = student.id;
  const created = new Date().toJSON();

  const requestSave = async () => {
    await addCommunicationHandler(
      studentId,
      coachId,
      topic,
      description,
      created
    );
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Communication"
      onActionButtonClick={requestSave}
      openModal="Add Communication"
    >
      <TextField
        label="Topic"
        select
        value={topic}
        onChange={(event) => {
          setTopic(event.target.value);
        }}
      >
        <MenuItem value="One-on-ne coaching session">
          One-on-One Coaching Session
        </MenuItem>
        <MenuItem value="Email">Email</MenuItem>
        <MenuItem value="Phone call">Phone Call</MenuItem>
        <MenuItem value="Text message">Text Message</MenuItem>
      </TextField>

      <TextField
        label="Description"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />

      <TextField
        label="Coach"
        select
        value={coachId}
        onChange={(event) => setCoachId(event.target.value)}
        disabled={activeCoaches.length === 0}
        style={{ width: '200px' }}
      >
        {activeCoaches && activeCoaches.length > 0 ? (
          activeCoaches.map((activeCoach) => (
            <MenuItem key={activeCoach.id} value={activeCoach.id}>
              {`${activeCoach.coachFirstName} ${activeCoach.coachLastName}`}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No coaches available</MenuItem>
        )}
      </TextField>
    </GenericModal>
  );
}

AddCommunicationsModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};

AddCommunicationsModal.defaultProps = {
  student: PropTypes.func,
  onSaveSuccess: undefined,
};
