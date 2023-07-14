import React, { useEffect } from 'react';
import { Box, Grid, Link } from '@mui/material';

import { NavLink } from 'react-router-dom';
import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';
import {
  ActivateStudentModal,
  RejectStudentModal,
} from './accept-reject-student-modal';
import { DeactivateStudentModal } from './de-activate-student-modal';
import { AddStudentModal } from './add-student-modal';
import { ChooseCoachModal } from './choose-coach-modal';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getActiveCoachesHandler } from '../coaches/coachHandlers';

const OPTIONS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
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
    id: 'options',
    disablePadding: false,
    align: 'left',
    render: (value, row, refreshTable) => {
      const { id } = row;
      return (
        <React.Fragment>
          <ActivateStudentModal
            studentId={id}
            onStudentActivate={refreshTable}
            student={row}
          />
          <RejectStudentModal
            studentId={id}
            onStudentReject={refreshTable}
            student={row}
          />
        </React.Fragment>
      );
    },
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);
  const [activeCoaches, setActiveCoaches] = React.useState([]);

  const requestActiveStudentsFunc = async () => {
    const activeStudents = await getActiveStudents();
    return { data: [...activeStudents.data] };
  };

  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoaches(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const COLUMNS = [
    {
      id: 'firstName',
      disablePadding: false,
      label: 'First Name',
      align: 'left',
      render: (value, row) => {
        const { id } = row;
        return (
          <NavLink to="/student-info" state={{ studentId: id }}>
            {value}
          </NavLink>
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
      id: 'id',
      disablePadding: false,
      label: 'Coach',
      align: 'left',
      render: (value, row, refreshTable) => (
        <React.Fragment>
          {row.coachFirstName}
          <ChooseCoachModal
            coaches={activeCoaches}
            studentId={value}
            refreshTable={refreshTable}
            student={row}
          />
        </React.Fragment>
      ),
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Deactivate',
      align: 'left',
      render: (value, row, refreshTable) => (
        <DeactivateStudentModal
          studentId={value}
          student={row}
          onStudentDeactivate={refreshTable}
        />
      ),
    },
  ];

  const refreshPage = () => {
    window.location.reload(false);
  };
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
                  ]}
                  requestFunc={requestActiveStudentsFunc}
                  customTableMaxHeight={510}
                  defaultFilterBy="lastName"
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={OPTIONS}
                  filterBy={[
                    'firstName',
                    'lastName',
                    'email',
                    'studentCellPhone',
                  ]}
                  requestFunc={getAppliedStudents}
                  customTableMaxHeight={510}
                  defaultFilterBy="lastName"
                >
                  <AddStudentModal onSubmit={refreshPage} />
                </DynamicTableWithRequest>
              )}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
