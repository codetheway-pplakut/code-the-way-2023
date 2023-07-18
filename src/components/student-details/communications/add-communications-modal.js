import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { validate } from 'validate.js';
import { flattenDeep, set } from 'lodash';
import { Today } from '@mui/icons-material';
import { getActiveCoachesHandler } from '../../coaches/coachHandlers';
import { addCommunicationHandler } from './communicationsHandler';
import { GenericModal } from '../../shared/generic-modal';

// import { TextFieldWithErrorMessage } from '../../shared/text-field-with-error-message';

export default function AddCommunicationsModal(props) {
  const { student, onSaveSuccess } = props;

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [coachId, setCoachId] = useState('');
  const [activeCoaches, setActiveCoaches] = React.useState([]);
  const [created, setCreated] = React.useState(new Date());

  const [descriptionEdit, setDescriptionEdit] = React.useState(false);
  const [topicEdit, setTopicEdit] = React.useState(false);
  const [coachIdEdit, setCoachIdEdit] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoaches(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const validator = validate(
    { description, topic, coachId },
    {
      description: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      topic: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
      coachId: {
        presence: { allowEmpty: false, message: 'Must not be Blank' },
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  const actionButtonDisabled = Boolean(messages.length || dateError);
  const studentId = student.id;

  const reset = () => {
    setTopic('');
    setDescription('');
    setCoachId('');

    setCreated(new Date());
    setDescriptionEdit(false);

    setTopicEdit(false);
    setDescriptionEdit(false);
    setCoachIdEdit(false);
  };
  const requestSave = async () => {
    try {
      await addCommunicationHandler(
        studentId,
        coachId,
        topic,
        description,
        created
      );
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Communication"
      onActionButtonClick={requestSave}
      actionButtonDisabled={actionButtonDisabled}
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalMessage="Fill out the fields below to add a communication."
      actionButtonColor="submit"
      onModalOpen={reset}
    >
      <Grid container alignItems="center" px={4} py={2} spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Topic"
            select
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
            helperText={displayErrorMessages('topic')}
            error={checkError('topic') && topicEdit}
            onBlur={() => setTopicEdit(true)}
            fullWidth
          >
            <MenuItem value="One-on-One Coaching Session">
              One-on-One Coaching Session
            </MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone call">Phone Call</MenuItem>
            <MenuItem value="Text message">Text Message</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            helperText={displayErrorMessages('description')}
            error={checkError('description') && descriptionEdit}
            onBlur={() => setDescriptionEdit(true)}
            required
            multiline
            fullWidth
            minRows={2}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Coach"
            select
            value={coachId}
            onChange={(event) => setCoachId(event.target.value)}
            disabled={activeCoaches.length === 0}
            style={{ width: '200px' }}
            helperText={displayErrorMessages('coachId')}
            error={checkError('coachId') && coachIdEdit}
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
        </Grid>

        <Grid item xs={6} mb="22px">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              label="Date of Communication"
              value={dayjs(created)}
              onChange={(newValue) => setCreated(newValue)}
              disableFuture
              defaultValue={Today}
              onError={(error) => {
                setDateError(error !== null);
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddCommunicationsModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};

AddCommunicationsModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};
