import React from 'react';
import { Box, Button, Grid, Link } from '@mui/material';

import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';

import {
  ArchiveStudentModal,
  ChooseCoachModal,
  AddStudentModal,
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
    render: (value, refreshTable, row) => {
      const { id } = row;
      return (
        <React.Fragment>
          <ArchiveStudentModal
            studentId={id}
            onStudentDeactivate={refreshTable}
          />{' '}
          <Button>{value}</Button>
        </React.Fragment>
      );
    },
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
  },
  {
    id: 'studentCellPhone',
    disablePadding: false,
    label: 'Student Cell',
    align: 'left',
  },
  {
    id: 'coachFirstName',
    disablePadding: false,
    label: 'Coach',
    align: 'left',
    render: (value) => <ChooseCoachModal coachName={value} />,
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);

  const requestFunc = async () => {
    const activeStudents = await getActiveStudents();

    return { data: [...activeStudents.data] };
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Students" subTitle="View all students.">
            <DynamicTabs
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />
            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={['firstName']}
                  requestFunc={requestFunc}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={['firstName']}
                  requestFunc={getAppliedStudents}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
