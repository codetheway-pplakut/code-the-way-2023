import React, { useState } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import GenericModal from './modal-component';

export function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState('');

  const actionButtonFunction = () => {
    console.log('Selected Coach:', selectedCoach);
    // Do other actions with the selected coach in this function
  };

  const coachNames = ['Bob the coach', 'Mr. O', 'Jeff'];

  const transformedArray = coachNames.map((name, index) => ({
    value: (index + 1).toString(),
    label: name,
  }));

  const handleCoachChange = (event) => {
    setSelectedCoach(event.target.value);
  };

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="test"
          select
          label="Select"
          value={selectedCoach}
          onChange={handleCoachChange}
          defaultValue="0"
        >
          {transformedArray.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Grid>
  );

  return (
    <div>
      <GenericModal
        openModal="test"
        modalHeadingTitle="Archive Coach"
        modalMessage={content}
        actionName="Archive"
        cancelButton="cancel"
        actionButtonFunction={actionButtonFunction}
        usingTwoButtonFormat
      />
    </div>
  );
}
