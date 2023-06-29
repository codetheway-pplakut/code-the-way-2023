import React from 'react';
import { Box, Button, Grid, Link } from '@mui/material';

import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';

import {
  ArchiveStudentModal,
  AddStudentModal,
} from '../coaches/modal-component';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { ChooseCoachModal } from '../coaches/choose-coach-modal';
import { getActiveCoachesHandler } from '../coaches/coachHandlers';

const response = await getActiveCoachesHandler();
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
    id: 'coach',
    disablePadding: false,
    label: 'Coach',
    align: 'left',
    active: false,
  },
  {
    id: 'options',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => {
      const { id } = row;
      return (
        <React.Fragment>
          <ArchiveStudentModal /> <ChooseCoachModal response={response} />
        </React.Fragment>
      );
    },
    active: false,
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Students">
            <DynamicTabs
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />
            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={[
                    'firstName',
                    'lastName',
                    'email',
                    'studentCellPhone',
                    'coach',
                  ]}
                  requestFunc={getActiveStudents}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={[
                    'firstName',
                    'lastName',
                    'email',
                    'studentCellPhone',
                    'coach',
                  ]}
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
