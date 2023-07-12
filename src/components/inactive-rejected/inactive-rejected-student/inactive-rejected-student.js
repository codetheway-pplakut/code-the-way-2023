import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  getInactiveStudents,
  getRejectedStudents,
} from '../../../services/students/students';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';
import { ActivateStudentModal } from '../student-activate-button/student-activate-button';

const COLUMNS = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  {
    id: 'email',
    label: 'Email',
  },
  { id: 'studentCellPhone', label: 'Phone', align: 'right' },
  { id: 'state', label: 'State' },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => {
      return (
        <ActivateStudentModal
          studentId={value}
          onStudentActivate={refreshTable}
        />
      );
    },
  },
];

export function InactiveRejectedStudent() {
  const requestFunc = async () => {
    const inactiveStudents = await getInactiveStudents();
    const rejectedStudents = await getRejectedStudents();

    return { data: [...inactiveStudents.data, ...rejectedStudents.data] };
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={100}>
        <EntitlementRestricted>
          <Box sx={{ width: '100%' }}>
            <DynamicTableWithRequest
              columns={COLUMNS}
              requestFunc={requestFunc}
              filterBy={['firstName', 'email', 'studentCellPhone', 'id']}
            />
          </Box>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
