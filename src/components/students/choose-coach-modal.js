import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import {
  assignStudentHandler,
  unassignStudentHandler,
} from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function ChooseCoachModal(props) {
  const { studentId, refreshTable, coaches, student } = props;

  const [coachId, setCoachId] = useState('');
  const [newCoachId, setNewCoachId] = useState('');

  const reassignCoachHandler = async () => {
    if (newCoachId === 'No Coach' && student.coachId !== '') {
      await unassignStudentHandler(student.coachId, studentId);
    } else if (newCoachId !== '' && newCoachId !== null) {
      await assignStudentHandler(newCoachId, studentId);
    }
    refreshTable();
  };

  const handleCoachChange = (event) => {
    setCoachId(event.target.value);
  };

  const recordValue = () => {
    setNewCoachId(coachId);
  };

  const content =
    student.coachId !== null ? (
      <TextField
        id="coach-select"
        select
        value={coachId}
        onFocus={recordValue}
        onChange={handleCoachChange}
        disabled={coaches.length === 0}
        style={{ width: '200px' }}
      >
        <MenuItem key="No Coach" value="No Coach">
          No Coach
        </MenuItem>
        {coaches && coaches.length > 0 ? (
          coaches.map((val) => (
            <MenuItem key={val.id} value={val.id}>
              {val.coachFirstName} {val.coachLastName}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Coaches Available</MenuItem>
        )}
      </TextField>
    ) : (
      <TextField
        id="coach-select"
        select
        value={coachId}
        onFocus={recordValue}
        onChange={handleCoachChange}
        disabled={coaches.length === 0}
        style={{ width: '200px' }}
      >
        {coaches && coaches.length > 0 ? (
          coaches.map((val) => (
            <MenuItem key={val.id} value={val.id}>
              {val.coachFirstName} {val.coachLastName}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Coaches Available</MenuItem>
        )}
      </TextField>
    );

  return (
    <GenericModal
      openButtonIcon={<EditIcon />}
      modalHeadingTitle={`Assign ${student.firstName}'s Coach`}
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={() => reassignCoachHandler()}
      onModalOpen={() => {
        setCoachId(student.coachId);
      }}
    />
  );
}

ChooseCoachModal.propTypes = {
  studentId: PropTypes.string.isRequired,
  refreshTable: PropTypes.func,
  coaches: PropTypes.array,
  student: PropTypes.object,
};

ChooseCoachModal.defaultProps = {
  refreshTable: null,
  coaches: [],
  student: null,
};
