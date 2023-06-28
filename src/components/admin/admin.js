import React from 'react';
import { Grid, Box, Link } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getActiveAdminsHandler } from './adminHandlers';
import { DeactivateAdminModal } from '../coaches/modal-component';

const COLUMNS = [
  {
    label: 'Username',
    id: 'userName',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
  },
  {
    id: 'adminCellPhone',
    disablePadding: false,
    label: 'Phone',
    align: 'left',
    active: false,
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, refreshTable) => {
      return (
        <DeactivateAdminModal
          adminId={value}
          onAdminDeactivate={refreshTable}
        />
      );
    },
    active: false,
  },
];

export function Admins() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Admins" subTitle="View all admins.">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveAdminsHandler}
                filterBy={['userName']}
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
