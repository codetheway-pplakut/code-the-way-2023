import React from 'react';
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
    headerName: 'ID',
    field: 'id',
    width: 300,
  },
  {
    headerName: 'Student ID',
    field: 'studentId',
    width: 300,
  },
  {
    headerName: 'Goal Set',
    field: 'goalSet',
    width: 100,
  },
  {
    headerName: 'Goal Review Date',
    field: 'goalReviewDate',
    width: 300,
  },
];

export function Goals() {
  return (
    <TableLayout
      columns={COLUMNS}
      requestFunc={getGoals}
      requestLabel="Request Goals"
      subTitle="View all goals"
      title="Goals"
    />
  );
}
