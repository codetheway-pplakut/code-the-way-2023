import React from 'react';
import { Box, Grid } from '@mui/material';

import { NavLink } from 'react-router-dom';
import { Layout } from '../../layout/layout';
import { RestrictedRestricted } from '../../entitlement-restricted/restricted-restricted';
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
      hideOrder: true,
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
        <RestrictedRestricted>
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
        </RestrictedRestricted>
      </Grid>
    </Grid>
  );
}
