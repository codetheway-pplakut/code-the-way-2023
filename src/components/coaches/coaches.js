import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { NavLink } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getActiveCoaches } from '../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { DeactivateCoachModal } from './de-activate-coach-modal';
import { GenericViewModal } from '../shared/generic-view-modal';
import { getStudentsByCoachId } from '../../services/students/students';
import { AddCoachModal } from './add-coach-modal';
import { EditCoachModal } from './edit-coach-modal';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';

export function Coaches() {
  const authentication = useAuthentication();
  const { username } = authentication;

  const STUDENTCOLUMNS = [
    {
      id: 'firstName',
      disablePadding: false,
      label: 'First Name',
      align: 'left',
      active: false,
      render: (value, row) => (
        <NavLink to="/student-info" state={{ studentId: row.id }}>
          {value}
        </NavLink>
      ),
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
      hideOrder: true,
    },
    {
      id: 'studentCellPhone',
      disablePadding: false,
      label: 'Student Cell',
      align: 'left',
      active: false,
      hideOrder: true,
    },
  ];
  const studentTableMaxHeight = 440;

  const COLUMNS = [
    {
      id: 'coachFirstName',
      disablePadding: false,
      label: 'First Name',
      align: 'left',
      active: false,
    },
    {
      id: 'coachLastName',
      disablePadding: false,
      label: 'Last Name',
      align: 'left',
      active: false,
    },
    {
      id: 'coachEmail',
      disablePadding: false,
      label: 'Email',
      align: 'left',
      active: false,
      hideOrder: true,
      render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    },
    {
      id: 'coachPhoneNumber',
      disablePadding: false,
      label: 'Phone',
      align: 'left',
      active: false,
      hideOrder: true,
    },
    {
      id: 'id',
      label: 'Students',
      disablePadding: false,
      align: 'left',
      hideOrder: true,
      render: (value, row) => {
        return (
          <GenericViewModal
            openModal={<InfoOutlinedIcon />}
            modalHeadingTitle={`View ${row.coachFirstName}'s Students`}
            viewModalWidth={900}
          >
            <DynamicTableWithRequest
              columns={STUDENTCOLUMNS}
              requestFunc={getStudentsByCoachId}
              filterBy={['firstName', 'lastName', 'email']}
              customTableMaxHeight={studentTableMaxHeight}
              requestData={value}
            />
          </GenericViewModal>
        );
      },
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Edit Coach',
      align: 'left',
      hideOrder: true,
      render: (value, row, refreshTable) => {
        return (
          <EditCoachModal
            coachId={value}
            coach={row}
            onCoachEdit={refreshTable}
          />
        );
      },
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Deactivate',
      align: 'left',
      hideOrder: true,
      render: (value, row, refreshTable) => {
        if (row.coachEmail !== username) {
          return (
            <DeactivateCoachModal
              coachId={value}
              coach={row}
              refreshTable={refreshTable}
            />
          );
        }

        return <Typography>Current User</Typography>;
      },
    },
  ];

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Coaches">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveCoaches}
                filterBy={['coachFirstName', 'coachLastName', 'coachEmail']}
                customTableMaxHeight="50vh"
                defaultFilterBy="coachLastName"
              >
                <AddCoachModal onSubmit={() => refreshPage} />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
