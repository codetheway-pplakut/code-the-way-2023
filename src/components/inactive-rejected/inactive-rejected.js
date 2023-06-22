import React from 'react';
import {
  InputAdornment,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';

export function InactiveRejected() {
  return (
    <EntitlementRestricted>
      <Layout title="Inactive/Rejected">
        <Tabs>
          <Tab label="Student" />
          <Tab label="Coach" />
          <Tab label="Admin" />
        </Tabs>
        <TextField
          placeholder="search..."
          variant="outlined"
          sx={{ mb: 2 }}
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
                <TableCell>test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>test</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </EntitlementRestricted>
  );
}
