import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Grid, Box, Tab, Tabs, Toolbar, IconButton } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SearchIcon, AddIcon } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import BasicModal from './modal-layouyt';

import { Todal } from './modal';

const columns = [
  { id: 'name', label: 'NAME', minWidth: 170 },
  {
    id: 'age',
    label: 'AGE',
    minWidth: 170,
  },
  { id: 'email', label: 'EMAIL', minWidth: 100 },
  {
    id: 'phone',
    label: 'PHONE',
    minWidth: 170,
  },
  {
    id: 'coach',
    label: 'COACH',
    minWidth: 170,
  },
  {
    id: 'trash',
    label: '',
    minWidth: 170,
  },
];

function createData(name, age, email, phone, coach) {
  const trash = <Todal />;

  return { name, age, email, phone, coach, trash };
}

const rows = [
  createData('j', '-1', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('ji', '2', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jih', '1', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData(
    'jiho',
    '19',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'jihon',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'jihong',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'jihong b',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'jihong ba',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'jihong bae',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'JIHONG BAE',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'JIHONG BAEEEEEE',
    '1',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
];

function tabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Box sx={{ width: '100%' }} marginInline={{}}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab value="one" label="active" sx={{ borderBottom: 1.5 }} />
            <Tab value="two" label="applicants" sx={{ borderBottom: 1.5 }} />
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
                inputProps={{ 'aria-label': 'search' }}
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
  );
}

export function Table1() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <tabs />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const valueRow = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof valueRow === 'number'
                            ? column.format(valueRow)
                            : valueRow}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
