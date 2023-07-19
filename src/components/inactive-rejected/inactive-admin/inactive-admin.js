import React from 'react';
import { Box, Grid, Link } from '@mui/material';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';
import { ActivateAdminModal } from '../../admin/de-activate-admin-modal';
import { getInactiveAdmins } from '../../../services/admin/admin';

const COLUMNS = [
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
    hideOrder: true,
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    hideOrder: true,
    render: (value, row, refreshTable) => {
      return (
        <ActivateAdminModal
          adminId={value}
          adminEmail={row.userName}
          onAdminActivate={refreshTable}
        />
      );
    },
  },
];

export function InactiveAdmin() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={100}>
        <EntitlementRestricted>
          <Box sx={{ width: '100%' }}>
            <DynamicTableWithRequest
              columns={COLUMNS}
              requestFunc={getInactiveAdmins}
              filterBy={['email']}
              customTableMaxHeight={510}
            />
          </Box>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
