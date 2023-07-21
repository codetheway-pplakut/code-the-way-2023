import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { assignStudentHandler, unassignStudentHandler } from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function ChooseCoachModal(props) {
  const { studentId, refreshTable, coaches, student } = props;

  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');
  const [labelText, setLabelText] = useState(
    student.coachId ? student.coachFirstName : 'Unassigned'
  );

  const reassignCoachHandler = async () => {
    if (
      newCoachId !== '' &&
      newCoachId !== 'Unassigned' &&
      newCoachId !== 'unassign'
    ) {
      await assignStudentHandler(newCoachId, studentId);
    }
    if (newCoachId === 'unassign' && student.coachId !== '') {
      await unassignStudentHandler(student.coachId, studentId);
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
      value={value}
      onFocus={recordValue}
      onChange={handleCoachChange}
      disabled={coaches.length === 0}
      style={{ width: '200px' }}
    >
      <MenuItem key="unassign" value="unassign">
        Unassign Coach
      </MenuItem>
      {coaches && coaches.length > 0 ? (
        coaches.map((val) => (
          <MenuItem key={val.id} value={val.id}>
            {val.coachFirstName} {val.coachLastName}
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
      modalHeadingTitle={`Assign ${student.firstName}'s Coach`}
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={() => reassignCoachHandler()}
      onModalOpen={() => {
        setLabelText(student.coachId ? student.coachFirstName : 'Unassigned');
        setValue(student.coachId ? student.coachId : '');
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
