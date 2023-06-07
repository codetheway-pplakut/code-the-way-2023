import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

export function DataTable(props) {
  const { columns, rows } = props;

  if (!rows.length) {
    return <Typography sx={{ my: 2 }}>No students found.</Typography>;
  }

  return (
    <DataGrid
      sx={{ height: 400, mt: 2 }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

DataTable.defaultProps = {
  columns: [],
  rows: [],
};
