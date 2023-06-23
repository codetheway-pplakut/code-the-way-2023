import React from 'react';
import { Grid, Link } from '@mui/material';
import { getStudents } from '../../services/students/students';
import { TableLayout } from '../table-layout/table-layout';

const COLUMNS = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
  },
  {
    id: 'studentCellPhone',
    numeric: false,
    disablePadding: false,
    label: 'Student Cell',
  },
  {
    id: 'parentFirstName',
    numeric: false,
    disablePadding: false,
    label: "Parent's First Name",
  },
  {
    id: 'parentLastName',
    numeric: false,
    disablePadding: false,
    label: "Parent's Last Name",
  },
];

export function Students() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <TableLayout
          columns={COLUMNS}
          requestFunc={getStudents}
          title="Students"
          subTitle="View all students"
          useTab
        />
      </Grid>
    </Grid>
  );
}
