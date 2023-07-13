import React from 'react';
import { Grid, Box, Link } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getActiveAdminsHandler } from './adminHandlers';
import { DeactivateAdminModal } from './de-activate-admin-modal';
import { AddAdminModal } from './addAdminModal';

const COLUMNS = [
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
  },
  {
    id: 'id',
    disablePadding: false,
    label: 'Deactivate',
    align: 'left',
    render: (value, row, refreshTable) => {
      return (
        <DeactivateAdminModal
          adminId={value}
          adminEmail={row.userName}
          onAdminDeactivate={refreshTable}
        />
      );
    },
    active: false,
  },
];

export function Admins() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Admins">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveAdminsHandler}
                filterBy={['email']}
              >
                <AddAdminModal />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
