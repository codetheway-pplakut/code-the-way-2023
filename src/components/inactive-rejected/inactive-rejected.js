import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { InactiveRejectedStudent } from './inactive-rejected-student/inactive-rejected-student';

export function InactiveRejected() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <EntitlementRestricted>
      <Layout title="Inactive/Rejected">
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab value={0} label="Student" />
          <Tab value={1} label="Coach" />
          <Tab value={2} label="Admin" />
        </Tabs>
        {tab === 0 && <InactiveRejectedStudent />}
      </Layout>
    </EntitlementRestricted>
  );
}
