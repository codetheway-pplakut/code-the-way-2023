import * as React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visuallyHidden } from '@mui/utils';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'NAME',
  },
  {
    id: 'age',
    numeric: false,
    disablePadding: false,
    label: 'AGE',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'EMAIL',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'PHONE',
  },
  {
    id: 'coach',
    numeric: false,
    disablePadding: false,
    label: 'COACH',
  },
  {
    id: 'trash',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];
export default function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
