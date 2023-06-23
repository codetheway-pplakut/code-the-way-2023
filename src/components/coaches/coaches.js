import React from 'react';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { getActiveCoachesHandler } from './coachHandlers';

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
