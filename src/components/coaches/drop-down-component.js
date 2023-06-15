import React from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import ModalComponent from './modal-component';

export function DropDownComponent() {
  // a sample function to represent code for clicking the action button (archiving, adding, etc.)

  // An example array to represent the coach names retrieved from the database
  const coachNames = ['Coach 1', 'Coach 2', 'Coach 3'];

  const transformedArray = coachNames.map((name, index) => ({
    value: (index + 1).toString(),
    label: name,
  }));

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField id="test" select label="Select" defaultValue="1">
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
      <ModalComponent
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
