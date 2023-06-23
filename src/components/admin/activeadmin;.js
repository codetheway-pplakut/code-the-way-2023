import React from 'react';
import { getActiveCoachesHandler } from '../coaches/coachHandlers';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { getActiveAdminsHandler } from './adminHandlers';

const COLUMNS = [
  {
    headerName: 'id',
    field: 'id',
    width: 100,
  },
  {
    headerName: 'email',
    field: 'email',
    width: 300,
  },
];
export function ActiveAdmins() {
  return (
    <TableLayoutWithRequest
      requestFunc={getActiveAdminsHandler}
      columns={COLUMNS}
    />
  );
}
