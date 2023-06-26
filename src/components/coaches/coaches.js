import React from 'react';
import { Box, Grid } from '@mui/material';
import DynamicTabs from '../table-layout/dynamicTabs';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getActiveCoaches } from '../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';

const COLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    active: false,
  },
  {
    id: 'studentCellPhone',
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
          <Layout title="Goals" subTitle="View All Goals">
            <DynamicTabs
              useTab
              tabNames={['Active', 'Inactive']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />

            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveCoaches}
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
