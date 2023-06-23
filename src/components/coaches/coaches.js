import React from 'react';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { getActiveCoachesHandler } from './coachHandlers';

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
    <TableLayoutWithRequest
      columns={COLUMNS}
      requestFunc={getActiveCoachesHandler}
      requestLabel="Request Coaches"
      subTitle="View all coaches"
      title="Coaches"
    />
  );
}
