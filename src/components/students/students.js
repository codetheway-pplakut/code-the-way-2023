import React from 'react';
import {
  Button,
  Grid,
  Link,
  TextField,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

import { getStudents } from '../../services/students/students';
import { TableLayout } from '../table-layout/table-layout';
import { Todal } from '../test/modal';

import {
  ArchiveStudentModal,
  ChooseCoachModal,
} from '../coaches/modal-component';

const COLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
    render: (value) => <Button>{value}</Button>,
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
  },
  {
    id: 'studentCellPhone',
    disablePadding: false,
    label: 'Student Cell',
    align: 'left',
    active: false,
  },
  {
    id: 'options',
    disablePadding: false,
    label: '',
    align: 'left',
    render: () => (
      <React.Fragment>
        <ArchiveStudentModal /> <ChooseCoachModal />
      </React.Fragment>
    ),
    active: false,
  },
];

export function Students() {
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <TableLayout
            columns={COLUMNS}
            requestFunc={getStudents}
            title="Students"
            subTitle="View all students"
          />
        </Grid>
      </Grid>
      {/* <Modal open={open} onClose={handleClose}>
        <Box
          alignItems="center"
          sx={{
            position: 'absolute',
            bgcolor: '#004CBB',
            top: '30%',
            left: '43%',
            width: 430,
            height: 530,
            color: 'white',
          }}
        >
          <Grid container direction="column">
            <Grid item align="center" sx={{ pt: 4 }}>
              <TextField
                error={error}
                size="small"
                id="filled-basic"
                // color="success"
                variant="outlined"
                label="Username"
                sx={{ color: 'white' }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </Grid>
            <Grid item align="center" sx={{ pt: 4 }}>
              <TextField
                error={error}
                size="small"
                id="filled-basic"
                // color="success"
                variant="outlined"
                label="Password"
                sx={{ color: 'white' }}
                onChange={(e) => {
                  setText1(e.target.value);
                }}
              />
            </Grid>
            <Grid item align="center" sx={{ pt: 4 }}>
              <Typography sx={{ color: pink[500] }}> {errorMessage}</Typography>
            </Grid>
            <Grid item align="center" sx={{ pt: 8 }}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={7}>
                  <Button variant="contained" onClick={submitHandler}>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal> */}
    </div>
  );
}
