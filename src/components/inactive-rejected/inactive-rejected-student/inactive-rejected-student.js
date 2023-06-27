import {
  InputAdornment,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { ActivateButton } from '../activate-button/activate-button';
import { filterRowsByInput } from '../../../utils/filter-rows-by-input/filter-rows-by-input';
import {
  getInactiveStudents,
  getRejectedStudents,
} from '../../../services/students/students';

const COLUMNS = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  {
    id: 'email',
    label: 'Email',
    cellFormat: (email) => <Link href={`mailto:${email}`}>{email}</Link>,
  },
  { id: 'studentCellPhone', label: 'Phone', align: 'right' },
  { id: 'state', label: 'State' },
  {
    id: 'id',
    label: '',
    align: 'center',
    cellFormat: (id) => <ActivateButton id={id} />,
  },
];

export function InactiveRejectedStudent() {
  const [filterInput, setFilterInput] = useState('');

  const [rows, setRows] = useState([]);

  const request = async () => {
    try {
      const inactiveStudents = await getInactiveStudents();
      const rejectedStudents = await getRejectedStudents();

      setRows([...inactiveStudents.data, ...rejectedStudents.data]);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    request();
  }, []);

  const filteredRows = filterRowsByInput(filterInput, rows, [
    'firstName',
    'lastName',
    'email',
    'studentCellPhone',
  ]);

  return (
    <React.Fragment>
      <TextField
        placeholder="search..."
        variant="outlined"
        sx={{ mb: 2 }}
        value={filterInput}
        onChange={(event) => setFilterInput(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => {
                const { id, label, align } = column;
                return (
                  <TableCell key={id} align={align}>
                    {label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const { id } = row;
              return (
                <TableRow key={id}>
                  {COLUMNS.map((column) => {
                    const { id: columnId, align, cellFormat } = column;

                    const value = row[columnId];
                    const children = cellFormat ? cellFormat(value) : value;

                    return (
                      <TableCell key={columnId} align={align}>
                        {children}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
