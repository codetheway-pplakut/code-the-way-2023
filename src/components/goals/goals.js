import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { getGoals } from '../../services/goals/goals';
import DynamicTabs from '../table-layout/dynamicTabs';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTable } from '../table-layout/dynamicTable';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getGoals();
      const { data } = response;
      setRows(data);
    } catch (error) {
      setRows([]);
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout
            hasError={hasError}
            isLoading={isLoading}
            title="Goals"
            subTitle="View All Goals"
          >
            <DynamicTabs
              useTab
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />

            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTable APIcolumns={COLUMNS} APIrows={rows} />
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
