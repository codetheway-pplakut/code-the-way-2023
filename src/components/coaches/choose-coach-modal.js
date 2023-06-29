import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getActiveCoachesHandler } from './coachHandlers';
import {
  assignStudent,
  getStudentById,
  unassignStudent,
} from '../../services/students/students';
import GenericModal from './modal-component';

export function ChooseCoachModal(props) {
  const [coaches, setCoaches] = useState([]);
  const [student, setStudent] = useState([]);
  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');
  const { response } = props;
  const request = async () => {
    try {
      //   const response = await getActiveCoachesHandler();
      const { data } = response;
      setCoaches(data);
    } catch (error) {
      setCoaches([]);
    }
  };
  useEffect(() => {
    request();
  }, []);

  const reassignCoachHandler = async (studentsId, coachesId) => {
    if (newCoachId !== '') {
      const updatedStudent = await getStudentById(studentsId);
      if (coachesId === 'Unassigned' && updatedStudent.coachId !== null) {
        await unassignStudent({
          coachId: updatedStudent.coachId,
          studentId: studentsId,
        });
      } else if (coachesId !== 'Unassigned') {
        await assignStudent({ coachId: coachesId, studentId: studentsId });
      }
    }
  };

  const handleCoachChange = (event) => {
    setValue(event.target.value);
    setNewCoachId(event.target.value);
  };

  const content = (
    <TextField
      id="coach-select"
      select
      label="Select Coach"
      value={value}
      onChange={handleCoachChange}
      helperText="Select Coach"
      disabled={coaches.length === 0}
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
      onActionButtonClick={() => reassignCoachHandler(student.id, coaches.id)}
    />
  );
}
