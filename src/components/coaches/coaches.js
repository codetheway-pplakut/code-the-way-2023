import React from 'react';
import { Grid } from '@mui/material';
import Table2 from './table';
import {
  ArchiveCoachModal,
  GenericModal,
  AddCoachModal,
} from './modal-component';

export function Coaches() {
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Table2 />
        </Grid>
      </Grid>

      <AddCoachModal />
      <ArchiveCoachModal />
    </div>
  );
}
