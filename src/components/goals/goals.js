import React from 'react';
import { Grid } from '@mui/material';
import { TableLayout } from '../table-layout/table-layout';
import { getGoals } from '../../services/goals/goals';

// [
//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "goalSet": "string",
//     "dateGoalSet": "2023-06-07T15:44:46.151Z",
//     "sel": "string",
//     "goalReviewDate": "2023-06-07T15:44:46.151Z",
//     "wasItAccomplished": "string",
//     "explanation": "string"
//   }
// ]
const COLUMNS = [
  {
    label: 'Goal Set',
    id: 'goalSet',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Date Goal Set',
    id: 'dateGoalSet',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Goal Review Date',
    id: 'goalReviewDate',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'WasItAccomplished',
    id: 'wasItAccomplished',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Explanation',
    id: 'explanation',
    numeric: false,
    disablePadding: false,
  },
];

export function Goals() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <TableLayout
          columns={COLUMNS}
          requestFunc={getGoals}
          title="Goals"
          subTitle="View all Goals"
          useTab={false}
        />
      </Grid>
    </Grid>
  );
}
