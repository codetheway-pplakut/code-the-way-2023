import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { RestrictedRestricted } from '../entitlement-restricted/restricted-restricted';
import { Layout } from '../layout/layout';
import { InactiveRejectedStudent } from './inactive-rejected-student/inactive-rejected-student';
import { InactiveCoach } from './inactive-coach/inactive-coach';
import { InactiveAdmin } from './inactive-admin/inactive-admin';

export function InactiveRejected() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <RestrictedRestricted>
      <Grid container justifyContent="center">
        <Box sx={{ width: '83%' }} style={{ align: 'center' }}>
          <Layout title="Inactive/Rejected">
            <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab value={0} label="Student" sx={{ borderBottom: 2 }} />
              <Tab value={1} label="Coach" sx={{ borderBottom: 2 }} />
              <Tab value={2} label="Admin" sx={{ borderBottom: 2 }} />
            </Tabs>
            {tab === 0 && <InactiveRejectedStudent />}
            {tab === 1 && <InactiveCoach />}
            {tab === 2 && <InactiveAdmin />}
          </Layout>
        </Box>
      </Grid>
    </RestrictedRestricted>
  );
}
