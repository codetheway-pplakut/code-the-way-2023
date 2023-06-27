import React from 'react';
import { Grid, Box } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { getActiveAdmins } from '../../services/admin/admin';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';

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
          <Layout title="Admins" subTitle="View All Admins">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveAdmins}
                filterBy={['userName']}
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
