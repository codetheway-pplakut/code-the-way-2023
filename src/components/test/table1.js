import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
// import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import BasicModal from './modal-layouyt';
// import { Todal } from './modal';
// import SearchBar from './search';
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
// const test = [
//   {
//     value: 'hi',
//     label: 'Mr. O',
//   },
//   {
//     value: 'test',
//     label: 'Matt',
//   },
//   {
//     value: 'ok',
//     label: 'Om ',
//   },
//   {
//     value: 'here',
//     label: 'Jihong',
//   },
// ];
// const content = (
//   <Grid container spacing={2} justifyContent="center">
//     <div>
//       <TextField
//         id="test"
//         select
//         label="Select"
//         defaultValue="here"
//         helperText="This is a test!"
//       >
//         {test.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     </div>
//   </Grid>
// );
function createData(name, age, email, phone, coach) {
  // const trash = (
  //   <BasicModal
  //     openModal="Select Coash"
  //     title="MCQ Test"
  //     close="done"
  //     modalContent={content}
  //   />
  // );
  //   const trash = <Todal />;
  return { name, age, email, phone, coach };
}
const originalRows = [
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
export function Table1() {
  // const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(originalRows);
  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal);
    });
    setRows(filteredRows);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        onChange={(event) => {
          requestSearch(event.target.value);
        }}
      />
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
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
