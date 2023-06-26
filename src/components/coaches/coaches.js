import React from 'react';
import { Box, Grid } from '@mui/material';
import DynamicTabs from '../table-layout/dynamicTabs';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import {
  getActiveCoaches,
  getInactiveCoaches,
} from '../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';

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
    label: 'Student Cell',
    align: 'left',
    active: false,
  },
  {
    id: 'options',
    disablePadding: false,
    label: '',
    align: 'left',
    active: false,
  },
];

export function Coaches() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Coaches">
            <DynamicTabs
              tabNames={['Active', 'Inactive']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />
            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getActiveCoaches}
                  filterBy={['coachFirstName']}
                />
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getInactiveCoaches}
                  filterBy={['coachFirstName']}
                />
              )}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
