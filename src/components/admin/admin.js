import React from 'react';
import { Grid, Box, Link, Typography } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getActiveAdminsHandler } from './adminHandlers';
import { DeactivateAdminModal } from './de-activate-admin-modal';
import { AddAdminModal } from './add-admin-modal';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';

export function Admins() {
  const authentication = useAuthentication();
  const { username } = authentication;
  const COLUMNS = [
    {
      id: 'email',
      disablePadding: false,
      label: 'Email',
      align: 'left',
      hideOrder: true,
      render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
      active: false,
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Deactivate',
      align: 'left',
      hideOrder: true,
      render: (value, row, refreshTable) => {
        if (row.email !== username) {
          return (
            <DeactivateAdminModal
              adminId={value}
              adminEmail={row.userName}
              onAdminDeactivate={refreshTable}
            />
          );
        }

        return <Typography>Current User</Typography>;
      },
      active: false,
    },
  ];
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Admins">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveAdminsHandler}
                filterBy={['email']}
              >
                <AddAdminModal onSubmit={refreshPage} />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
