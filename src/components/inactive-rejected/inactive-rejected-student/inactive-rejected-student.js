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
    phone: '123-456-7890',
  },
];

export function InactiveRejectedStudent() {
  const [filterInput, setFilterInput] = useState('');

  const filteredRows = ROWS.filter((row) => {
    const { name, email, phone } = row;
    const lowerFilterInput = filterInput.toLowerCase();

    return (
      name.toLowerCase().includes(lowerFilterInput) ||
      email.toLowerCase().includes(lowerFilterInput) ||
      phone.toLowerCase().includes(lowerFilterInput)
    );
  });

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
