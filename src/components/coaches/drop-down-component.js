import React from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import ModalComponent from './modal-component';

export function Coaches() {
  // a sample function to represent code for clicking the action button (archiving, adding, etc.)
  const actionButtonFunction = () => {
    console.log('clicked!');
  };

  const test = [
    {
      value: 'hi',
      label: 'Bob the coach',
    },
    {
      value: 'test',
      label: 'Mr. O',
    },
    {
      value: 'ok',
      label: 'Jeff 1',
    },
    {
      value: 'here',
      label: 'Jeff 2',
    },
  ];
  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="test"
          select
          label="Select"
          defaultValue="ok"
          helperText="This is a test!"
        >
          {test.map((option) => (
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
