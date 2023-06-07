import React from 'react';
import { getCoaches } from '../../services/coaches/coaches';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';

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
      requestFunc={getCoaches}
      requestLabel="Request Coaches"
      subTitle="View all coaches"
      title="Coaches"
    />
  );
}
