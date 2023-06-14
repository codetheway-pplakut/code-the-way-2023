import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'name', label: 'NAME', minWidth: 170 },
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
];

function createData(name, email, phone, coach) {
  return { name, email, phone, coach };
}

const rows = [
  createData('j', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('ji', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jih', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jiho', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jihon', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jihong', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jihong b', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData('jihong ba', 'jihongbae@gmail.com', '262-282-4209', 'mrosterburg'),
  createData(
    'jihong bae',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'JIHONG BAE',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
  createData(
    'JIHONG BAEEEEEE',
    'jihongbae@gmail.com',
    '262-282-4209',
    'mrosterburg'
  ),
];

export function Table1() {
  // const navigate = useNavigate();
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
                    <DeleteIcon />
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
