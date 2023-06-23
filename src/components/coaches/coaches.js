import React from 'react';
import { Grid } from '@mui/material';
import GenericModal from './modal-component';
import Table2 from './table';

export function Coaches() {
  const actionButtonFunction = () => {
    console.log('Function completed');
    // Do other actions with the selected coach in this function
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Table2 />
        </Grid>
      </Grid>

      <GenericModal
        usingFields
        openModal="Register a Coach"
        modalHeadingTitle="Create a Coach"
        modalMessage="Create a username and password"
        actionButtonColor="submit"
        actionButtonTitle="Register"
        cancelButtonTitle="Cancel"
      />
      <GenericModal
        usingDropDown
        openModal="Select a Coach"
        modalHeadingTitle="Select a Coach"
        modalMessage="Select a coach to assign this student to."
        actionButtonTitle="Select"
        actionButtonColor="submit"
        cancelButtonTitle="cancel"
      />
      <GenericModal
        usingTwoButtonFormat
        openModal="Archive"
        modalHeadingTitle="Archive a Coach"
        modalMessage="Are you sure you want to archive this coach?"
        actionButtonTitle="Archive"
        cancelButtonTitle="cancel"
        actionButtonFunction={actionButtonFunction}
        actionButtonColor="archive"
      />
    </div>
  );
}
