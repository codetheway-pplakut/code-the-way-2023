import React from 'react';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addStudentHandler } from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function AddStudentModal() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [email, setEmail] = React.useState('');
  const [cellPhone, setCellPhone] = React.useState('');

  const addStudentAction = async () => {
    await addStudentHandler(firstName, lastName, dateOfBirth, cellPhone, email);
  };

  const content = (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <TextField
          label="First Name"
          margin="normal"
          size="large"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
      </Grid>
      <Grid item sx={{ mb: 2 }}>
        <TextField
          label="Last Name"
          margin="normal"
          size="large"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </Grid>
      <Grid item sx={{ mb: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of Birth"
            margin="normal"
            sx={{ width: 210 }}
            value={dayjs(dateOfBirth)}
            onChange={(newValue) => setDateOfBirth(newValue)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <TextField
          label="Phone"
          margin="normal"
          size="large"
          onChange={(event) => {
            setCellPhone(event.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          margin="normal"
          size="large"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add Student"
      modalMessage={content}
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Add"
      cancelButtonTitle="Cancel"
      onActionButtonClick={addStudentAction}
    />
  );
}
