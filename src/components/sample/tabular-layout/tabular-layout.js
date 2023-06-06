import React from 'react';
import { Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LayersIcon from '@mui/icons-material/Layers';
import { DataGrid } from '@mui/x-data-grid';
import { Layout } from '../../layout/layout';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export function TabularLayout() {
  return (
    <Layout
      title="Tabular Demo"
      subTitle="A Sample Tabular Layout"
      actions={[
        <Button
          key={1}
          size="small"
          startIcon={<ThumbUpAltIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 1
        </Button>,
        <Button
          key={2}
          size="small"
          startIcon={<AddReactionIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 2
        </Button>,
        <Button
          key={3}
          size="small"
          startIcon={<LayersIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 3
        </Button>,
      ]}
    >
      <DataGrid
        sx={{ background: 'white' }}
        rows={rows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Layout>
  );
}
