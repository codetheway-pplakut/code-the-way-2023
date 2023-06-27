import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Box, Grid, IconButton, Toolbar } from '@mui/material';
import EnhancedTableHead from './enhancedTableHead';
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
  const { APIcolumns, APIrows, filterBy, customTableMaxHeight } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [rows, setRows] = useState(APIrows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const requestSearch = (searchedVal) => {
    const lowerFilterInput = String(searchedVal).toLowerCase();

    const filteredRows = APIrows.filter((row) => {
      return filterBy.some((key) => {
        const value = row[key];
        const lowerValue = String(value).toLowerCase();
        return lowerValue.includes(lowerFilterInput);
      });
    });
    setRows(filteredRows);
  };

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [rows, order, orderBy]
  );

  return (
    <div>
      <Box sx={{ width: '100%' }} marginInline={{}}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        />
        <Toolbar>
          <Grid paddingLeft="70%" item>
            <SearchBar requestSearch={requestSearch} />
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
                {props.children}
              </IconButton>
            </Box>
          </Grid>
        </Toolbar>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ maxHeight: customTableMaxHeight }}>
          <Table sx={{ minWidth: 750 }} size="medium">
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

              {rows > 0 && (
                <TableRow
                  style={{
                    height: 53 * rows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

DynamicTable.propTypes = {
  APIcolumns: PropTypes.arrayOf(PropTypes.object),
  APIrows: PropTypes.arrayOf(PropTypes.object),
  filterBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  customTableMaxHeight: PropTypes.number,
};

DynamicTable.defaultProps = {
  APIcolumns: [],
  APIrows: [],
  customTableMaxHeight: null,
};
