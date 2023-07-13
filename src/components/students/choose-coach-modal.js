import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { assignStudentHandler } from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function ChooseCoachModal(props) {
  const { studentId, refreshTable, coaches, student } = props;

  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');

  const reassignCoachHandler = async () => {
    if (newCoachId !== '') {
      if (newCoachId !== 'Unassigned') {
        await assignStudentHandler(newCoachId, studentId);
      }
    }
    refreshTable();
  };

  const handleCoachChange = (event) => {
    setValue(event.target.value);
  };

  const recordValue = () => {
    setNewCoachId(value);
  };

  const content = (
    <TextField
      id="coach-select"
      select
      label="Unassigned"
      value={value}
      onFocus={recordValue}
      onChange={handleCoachChange}
      disabled={coaches.length === 0}
      style={{ width: '200px' }}
    >
      {coaches && coaches.length > 0 ? (
        coaches.map((coach) => (
          <MenuItem key={coach.id} value={coach.id}>
            {coach.coachFirstName} {coach.coachLastName}
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
      modalHeadingTitle="Assign Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={() => reassignCoachHandler()}
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
