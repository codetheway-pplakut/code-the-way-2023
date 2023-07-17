import React from 'react';
import { Box, Grid } from '@mui/material';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';
import { getInactiveCoaches } from '../../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';
import { ActivateCoachModal } from '../../coaches/de-activate-coach-modal';

const COLUMNS = [
  {
    id: 'coachFirstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachLastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachEmail',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    active: false,
  },
  {
    id: 'coachPhoneNumber',
    disablePadding: false,
    label: 'Phone',
    align: 'left',
    active: false,
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => {
      return (
        <ActivateCoachModal
          coachId={value}
          coach={row}
          onCoachActivate={refreshTable}
        />
      );
    },
  },
];

export function InactiveCoach() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={100}>
        <EntitlementRestricted>
          <Box sx={{ width: '100%' }}>
            <DynamicTableWithRequest
              columns={COLUMNS}
              requestFunc={getInactiveCoaches}
              filterBy={[
                'coachFirstName',
                'coachLastName',
                'coachEmail',
                'coachPhoneNumber',
              ]}
              customTableMaxHeight={510}
            />
          </Box>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
