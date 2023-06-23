import React from 'react';
import { Grid } from '@mui/material';
import Table2 from './table';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { getActiveCoachesHandler } from './coachHandlers';
import { AddCoachModal, ArchiveCoachModal } from './modal-component';

const COLUMNS = [
  {
    headerName: 'ID',
    field: 'id',
    width: 300,
  },
  {
    headerName: 'First Name',
    field: 'coachFirstName',
    width: 100,
  },
  {
    headerName: 'Last Name',
    field: 'coachLastName',
    width: 100,
  },
  {
    headerName: 'Email',
    field: 'coachEmail',
    width: 300,
  },
];

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
