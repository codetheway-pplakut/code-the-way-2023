import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import DynamicTabs from '../table-layout/dynamicTabs';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTable } from '../table-layout/dynamicTable';
import { getAllAdminsHandler } from './adminHandlers';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getAllAdminsHandler();
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
            title="Admins"
            subTitle="View All Admins"
          >
            <DynamicTabs
              tabNames={['Active', 'Inactive']}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />

            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTable
                  APIcolumns={COLUMNS}
                  APIrows={rows}
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
