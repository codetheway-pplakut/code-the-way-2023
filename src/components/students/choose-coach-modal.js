import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GenericModal from '../shared/generic-modal';

export function ChooseCoachModal() {
  const test = [
    {
      value: 'Coach API',
      label: 'Coach 1 API Call',
    },
    {
      value: 'Coach API!',
      label: 'Coach 2 API Call',
    },
    {
      value: 'Coach API!!',
      label: 'Coach 3 API Call',
    },
    {
      value: 'Coach API!!!',
      label: 'Coach 4 API Call',
    },
  ];
  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="API"
          select
          label="Select"
          defaultValue="Coach API"
          helperText="Select Coach"
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
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Change Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
    />
  );
}
