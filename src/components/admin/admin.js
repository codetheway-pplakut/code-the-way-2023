import React from 'react';
import { Grid, Box } from '@mui/material';
import DynamicTabs from '../table-layout/dynamicTabs';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { getAllAdminsHandler } from './adminHandlers';
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
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Admins" subTitle="View All Admins">
            <DynamicTabs
              tabNames={['Active', 'Inactive']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />

            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getAllAdminsHandler}
                  sortBy={['userName']}
                />
              )}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
