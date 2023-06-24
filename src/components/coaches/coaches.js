import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { DynamicTable } from '../table-layout/dynamicTable';
import DynamicTabs from '../table-layout/dynamicTabs';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getAllCoaches } from '../../services/coaches/coaches';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getAllCoaches();
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
              tabNames={['Active', 'Inactive']}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />

            <Box sx={{ width: '100%' }}>
              <DynamicTable APIcolumns={COLUMNS} APIrows={rows} />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
