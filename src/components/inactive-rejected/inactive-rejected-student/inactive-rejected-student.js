import React from 'react';
import {
  getInactiveStudents,
  getRejectedStudents,
} from '../../../services/students/students';
import { DynamicTableWithRequest } from '../../table-layout/dynamicTableWithRequest';

const COLUMNS = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  {
    id: 'email',
    label: 'Email',
  },
  { id: 'studentCellPhone', label: 'Phone', align: 'right' },
  { id: 'state', label: 'State' },
  {
    id: 'id',
    label: '',
    align: 'center',
  },
];

export function InactiveRejectedStudent() {
  const requestFunc = async () => {
    const inactiveStudents = await getInactiveStudents();
    const rejectedStudents = await getRejectedStudents();

    return { data: [...inactiveStudents.data, ...rejectedStudents.data] };
  };

  return (
    <DynamicTableWithRequest columns={COLUMNS} requestFunc={requestFunc} />
  );
}
