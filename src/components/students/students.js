import React from 'react';
// import { getStudents } from '../../services/students/students';
// // import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
// import { StudentTable } from './studentTable';

// import { Table2 } from './newtable';
// import { Layout } from '../layout/layout';

// import { Layout } from '../layout/layout';
// import { Box } from '@mui/material/Box';
import { DynamicTable } from './dynamicTable';

// const COLUMNS = [
//   {
//     headerName: 'ID',
//     field: 'id',
//   },
//   {
//     headerName: 'First Name',
//     field: 'firstName',
//   },
//   {
//     headerName: 'Last Name',
//     field: 'lastName',
//   },
//   {
//     headerName: 'Email',
//     field: 'email',
//   },
//   {
//     headerName: 'State',
//     field: 'state',
//   },
//   {
//     headerName: 'Parent First Name',
//     field: 'parentFirstName',
//   },
//   {
//     headerName: 'Parent Last Name',
//     field: 'parentLastName',
//   },
// ];

export function Students() {
  return (
    // <StudentTable
    //   columns={COLUMNS}
    //   tableSize="small"
    //   requestFunc={getStudents}
    //   requestLabel="Request Students"
    //   subTitle="View all students"
    //   title="Students"
    // />

    <DynamicTable />
  );
}
