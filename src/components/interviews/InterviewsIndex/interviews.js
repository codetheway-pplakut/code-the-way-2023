import React from 'react';
import { Box, Grid } from '@mui/material';

import { NavLink } from 'react-router-dom';
import { Layout } from '../../layout/layout';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';
import { getInterviewsHandler } from '../interviewsHandler';
import { CreateInterviewModal } from './createNewInterviewModal';
import { EditInterviewModal } from './editInterviewModal';

export function Interviews() {
  const refreshPage = () => {
    window.location.reload(false);
  };
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
            {value}
          </NavLink>
        );
      },
    },
    {
      id: 'options',
      disablePadding: false,
      label: 'Edit',
      align: 'left',
      render: (value, row, refreshTable) => {
        const { id, interviewName } = row;
        return (
          <Box>
            <EditInterviewModal
              onSubmit={refreshTable}
              interviewId={id}
              interviewName={interviewName}
            />
          </Box>
        );
      },
    },
  ];

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
              >
                <CreateInterviewModal onSubmit={refreshPage} />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
