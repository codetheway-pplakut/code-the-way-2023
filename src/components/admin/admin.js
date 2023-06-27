import React from 'react';
import { Grid, Box } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { getActiveAdmins, getInactiveAdmins } from '../../services/admin/admin';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getInactiveAdminsHandler } from './adminHandlers';

const COLUMNS = [
  {
    label: 'Username',
    id: 'userName',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Email',
    id: 'email',
    numeric: false,
    disablePadding: false,
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
                requestFunc={getInactiveAdminsHandler}
                filterBy={['userName', 'email']}
              >
                {/* <AddAdminModal /> */}
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
