import React from 'react';
import { Grid, Box } from '@mui/material';
import { getGoals } from '../../services/goals/goals';
import DynamicTabs from '../table-layout/dynamicTabs';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';

const COLUMNS = [
  {
    label: 'Goal Set',
    id: 'goalSet',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Date Goal Set',
    id: 'dateGoalSet',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Goal Review Date',
    id: 'goalReviewDate',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'WasItAccomplished',
    id: 'wasItAccomplished',
    numeric: false,
    disablePadding: false,
  },
  {
    label: 'Explanation',
    id: 'explanation',
    numeric: false,
    disablePadding: false,
  },
];

export function Goals() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Goals" subTitle="View All Goals">
            <DynamicTabs
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />

            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getGoals}
                  sortBy={['goalSet']}
                />
              )}

              {/* {tabValue === 1 && (
                <DynamicTable APIcolumns={COLUMNS} APIrows={rows} />
              )} */}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
