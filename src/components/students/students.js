import React from 'react';
import { Box, Button, Grid, Link } from '@mui/material';

import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';

import {
  ArchiveStudentModal,
  ChooseCoachModal,
} from '../coaches/modal-component';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';

const COLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
    render: (value) => <Button>{value}</Button>,
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
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
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
    render: () => (
      <React.Fragment>
        <ArchiveStudentModal /> <ChooseCoachModal />
      </React.Fragment>
    ),
    active: false,
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Students" subTitle="View all students.">
            <DynamicTabs
              useTab
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />
            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getActiveStudents}
                />
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  requestFunc={getAppliedStudents}
                />
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
