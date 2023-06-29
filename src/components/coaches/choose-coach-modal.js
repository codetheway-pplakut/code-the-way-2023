import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getActiveCoachesHandler } from './coachHandlers';
import {
  assignStudent,
  getActiveStudents,
  getStudentById,
  unassignStudent,
} from '../../services/students/students';
import GenericModal from './modal-component';

export function ChooseCoachModal(props) {
  const [coaches, setCoaches] = useState([]);
  const [student, setStudent] = useState([]);
  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');

  const { response, studentsId } = props;
  const request = async () => {
    try {
      const { data } = response;
      setCoaches(data);
    } catch (error) {
      setCoaches([]);
    }
  };
  useEffect(() => {
    request();
  }, []);

  // const studentsId = '7fb4f1b2-3d3e-4b56-b106-08db6c1d577e'; ==> can use as sample

  const reassignCoachHandler = async (coachsId) => {
    if (newCoachId !== '') {
      const updatedStudent = await getStudentById(studentsId);

      if (coachsId === 'Unassigned' && updatedStudent.coachId !== null) {
        await unassignStudent({
          coachId: updatedStudent.coachId,
          studentId: studentsId,
        });
      } else if (coachsId !== 'Unassigned') {
        await assignStudent({
          studentId: studentsId,
          coachId: coachsId,
        });
      }
    }
  };

  const handleCoachChange = (event) => {
    setValue(event.target.value);
    setNewCoachId(event.target.value);
    // console.log(studentId);
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
      onActionButtonClick={() => reassignCoachHandler(student.id, newCoachId)}
    />
  );
}
