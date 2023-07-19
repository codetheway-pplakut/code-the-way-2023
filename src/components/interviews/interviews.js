import React, { useEffect } from 'react';
import { Box, Grid, Link } from '@mui/material';

import { NavLink } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getInterviewsHandler } from './interviewsHandler';

export function Interviews() {
  const COLUMNS = [
    {
      id: 'interviewName',
      disablePadding: false,
      label: 'Interview Name',
      align: 'left',
      render: (value, row) => {
        const { id, interviewName } = row;
        return (
          <NavLink to="/Interview" state={{ interviewId: id, interviewName }}>
            <Link>{value}</Link>
          </NavLink>
        );
      },
    },
    {
      id: 'options',
      disablePadding: false,
      align: 'left',
    },
  ];

  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Interviews">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                filterBy={['interviewName']}
                requestFunc={getInterviewsHandler}
                customTableMaxHeight={510}
                defaultFilterBy="interviewName"
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
