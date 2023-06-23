import React from 'react';
import {
  Button,
  Grid,
  Link,
  TextField,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

import { getStudents } from '../../services/students/students';
import { TableLayout } from '../table-layout/table-layout';
import { Todal } from '../test/modal';

import {
  ArchiveStudentModal,
  ChooseCoachModal,
} from '../coaches/modal-component';

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
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <TableLayout
            columns={COLUMNS}
            requestFunc={getStudents}
            title="Students"
            subTitle="View all students"
            useTab
            tabNames={['active', 'applicant']}
          />
        </Grid>
      </Grid>
    </div>
  );
}
