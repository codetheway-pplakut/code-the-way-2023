import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  assignStudent,
  getActiveStudents,
  getStudentById,
  unassignStudent,
} from '../../services/students/students';
import {
  assignStudentHandler,
  unassignStudentHandler,
} from './studentHandlers';
import { getActiveCoaches } from '../../services/coaches/coaches';
import GenericModal from '../shared/generic-modal';

export function ChooseCoachModal(props) {
  const [coaches, setCoaches] = useState([]);
  const [student, setStudent] = useState([]);
  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');

  const { apiResponse, studentId, refreshTable } = props;
  const request = async () => {
    try {
      const { data } = apiResponse;
      setCoaches(data);
    } catch (error) {
      setCoaches([]);
    }
  };
  useEffect(() => {
    request();
  }, []);

  const reassignCoachHandler = async (coachId) => {
    if (coachId !== '') {
      if (coachId !== 'Unassigned') {
        assignStudentHandler(coachId, studentId);
      }
    }
    refreshTable();
  };

  const handleCoachChange = (event) => {
    setValue(event.target.value);
    setNewCoachId(event.target.value);
    console.log(newCoachId);
  };

  const content = (
    <TextField
      id="coach-select"
      select
      label="Select Coach"
      value={value}
      onChange={handleCoachChange}
      disabled={coaches.length === 0}
      style={{ width: '200px' }}
    >
      {coaches && coaches.length > 0 ? (
        coaches.map((coach) => (
          <MenuItem key={coach.id} value={coach.id}>
            {coach.coachFirstName}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No coaches available</MenuItem>
      )}
    </TextField>
  );

  return (
    <GenericModal
      openButtonIcon={<EditIcon />}
      modalHeadingTitle="Change Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={() => reassignCoachHandler(newCoachId)}
    />
  );
}
