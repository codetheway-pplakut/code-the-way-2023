import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, Tab, Tabs, Toolbar } from '@mui/material';

import EnhancedTableHead from './enhancedTableHead';
import { Search, SearchIconWrapper, StyledInputBase } from './search';
import { Todal } from './modal';

function createData(name, age, email, carbs, coach) {
  return {
    name,
    age,
    email,
    carbs,
    coach,
  };
}

const originalRows = [
  createData(
    'jihong bae',
    -1,
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'abby winn ',
    200,
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData('omh', 28, 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData(
    'brandon',
    19,
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData('noah', 1, 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData(
    'osterburg',
    54,
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData('adam', 1, 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData(
    'aniket',
    22,
    'jihongbae@gmail.com',
    '262-282-4209',
    'stephen hawking'
  ),
  createData(
    'john doe',
    1,
    'jihongbae@gmail.com',
    '262-282-4209',
    'andrej karpathy'
  ),
  createData(
    'jane doe',
    1.9,
    'jihongbae@gmail.com',
    '262-282-4209',
    'albert einstein'
  ),
  createData(
    'alan S',
    0.4,
    'jihongbae@gmail.com',
    '262-282-4209',
    'nikola tesla'
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function DynamicTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tabValue, setTabValue] = React.useState('one');
  const [rows, setRows] = useState(originalRows);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal); // coachFirstName
    });
    setRows(filteredRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <div>
      <Box sx={{ width: '100%' }} marginInline={{}}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="nav tabs example"
            >
              <Tab value="one" label="active" />
              <Tab value="two" label="applicants" />
            </Tabs>
          </Grid>
          <Toolbar>
            <Grid item>
              <Search sx={{ border: 1.5 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={(event) => {
                    requestSearch(event.target.value);
                  }}
                />
              </Search>
            </Grid>
            <Grid item>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
          </Toolbar>
        </Grid>
      </Box>
      <Box sx={{ width: '100%' }}>
        {/* {tabValue === 'one' && (
        
        )} */}

        {tabValue === 'two' && (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.coach}</TableCell>
                        <TableCell align="right">
                          <Todal />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Paper>
        )}
      </Box>
    </div>
  );
}
