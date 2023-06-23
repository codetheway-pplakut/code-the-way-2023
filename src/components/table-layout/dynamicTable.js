import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import EnhancedTableHead from './enhancedTableHead';
import DynamicTab from './dynamicTabs';
import { SearchBar } from './search';
import { AddStudentModal } from '../coaches/modal-component';

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

export function DynamicTable(props) {
  const { APIcolumns, APIrows, useTab } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tabValue, setTabValue] = React.useState('one');
  const [rows, setRows] = useState(APIrows);

  console.log(useTab);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = APIrows.filter((row) => {
      return row.firstName.toLowerCase().includes(searchedVal); // coachFirstName
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

  const table = (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              columns={APIcolumns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    {APIcolumns.map((column) => {
                      const { id: columnId, numeric, render } = column;
                      const value = row[columnId];

                      return (
                        <TableCell
                          align={numeric ? 'right' : 'left'}
                          key={columnId}
                        >
                          {render ? render(value) : value}
                        </TableCell>
                      );
                    })}
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
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
            <DynamicTab
              useTab={useTab}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />
          </Grid>
          <Grid item>
            <SearchBar requestSearch={requestSearch} />
          </Grid>
          <Grid item>
            <Grid item>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AddStudentModal />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%' }}>
        {tabValue === 'one' && table}

        {/* {tabValue === 'two' && (
         
        )} */}
      </Box>
    </div>
  );
}

DynamicTable.propTypes = {
  APIcolumns: PropTypes.arrayOf(PropTypes.object),
  APIrows: PropTypes.arrayOf(PropTypes.object),
  useTab: PropTypes.bool.isRequired,
};

DynamicTable.defaultProps = {
  APIcolumns: [],
  APIrows: [],
};
