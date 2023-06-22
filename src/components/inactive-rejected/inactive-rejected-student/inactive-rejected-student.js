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
import React, { useState } from 'react';
import { ActivateButton } from '../activate-button/activate-button';
import { filterRowsByInput } from '../../../utils/filter-rows-by-input/filter-rows-by-input';

const COLUMNS = [
  { id: 'name', label: 'Name' },
  {
    id: 'email',
    label: 'Email',
    cellFormat: (email) => <Link href={`mailto:${email}`}>{email}</Link>,
  },
  { id: 'phone', label: 'Phone', align: 'right' },
  {
    id: 'id',
    label: '',
    align: 'center',
    cellFormat: (id) => <ActivateButton id={id} />,
  },
];

const ROWS = [
  {
    id: 1,
    name: 'test',
    email: 'test@test.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'test 2',
    email: 'test@test.com',
    phone: '123-456-7890',
  },
  {
    id: 3,
    name: 'test 4',
    email: 'test@test.com',
    phone: '414-444-4444',
  },
];

export function InactiveRejectedStudent() {
  const [filterInput, setFilterInput] = useState('');

  const filteredRows = filterRowsByInput(filterInput, ROWS, [
    'name',
    'email',
    'phone',
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
