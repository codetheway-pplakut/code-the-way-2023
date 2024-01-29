import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  getInactiveStudents,
  getRejectedStudents,
} from '../../../services/students/students';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';
import { RestrictedRestricted } from '../../entitlement-restricted/restricted-restricted';
import { ActivateStudentModal } from '../../students/de-activate-student-modal';

const COLUMNS = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  {
    id: 'email',
    label: 'Email',
    hideOrder: true,
  },
  { id: 'studentCellPhone', label: 'Phone', align: 'right', hideOrder: true },
  { id: 'state', label: 'State' },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    hideOrder: true,
    render: (value, row, refreshTable) => {
      return (
        <ActivateStudentModal
          studentId={value}
          student={row}
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
        <RestrictedRestricted>
          <Box sx={{ width: '100%' }}>
            <DynamicTableWithRequest
              columns={COLUMNS}
              requestFunc={requestFunc}
              filterBy={['firstName', 'lastName', 'email']}
              defaultFilterBy="lastName"
              customTableMaxHeight={510}
            />
          </Box>
        </RestrictedRestricted>
      </Grid>
    </Grid>
  );
}
