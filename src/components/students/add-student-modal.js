import React from 'react';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../shared/generic-modal';

export function AddStudentModal() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const content = (
    <React.Fragment>
      <TextField
        label="First Name"
        margin="normal"
        size="small"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        label="Last Name"
        margin="normal"
        size="small"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <TextField
        label="Email"
        margin="normal"
        size="small"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        label="Phone"
        margin="normal"
        size="small"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
    </React.Fragment>
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
    />
  );
}
