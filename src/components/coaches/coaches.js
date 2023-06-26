import React from 'react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table2 from './table';
import { TableLayoutWithRequest } from '../table-layout-with-request/table-layout-with-request';
import { getActiveCoachesHandler, addCoachHandler } from './coachHandlers';
import GenericModal, {
  AddCoachModal,
  ArchiveCoachModal,
} from './modal-component';
import { TextFieldWithErrorMessage } from './text-field-with-error-message';
import { addAdminHandler } from '../admin/adminHandlers';

const iconStyle = {
  bgcolor: '#3E4C61',
  color: '#ffffff',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 40,
  minHeight: 40,
  borderRadius: '5px',
};
const COLUMNS = [
  {
    headerName: 'ID',
    field: 'id',
    width: 300,
  },
  {
    headerName: 'First Name',
    field: 'coachFirstName',
    width: 100,
  },
  {
    headerName: 'Last Name',
    field: 'coachLastName',
    width: 100,
  },
  {
    headerName: 'Email',
    field: 'coachEmail',
    width: 300,
  },
];
export function AddAdmin() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const cancelHandler = () => {
    setUsername('');
    setPassword('');
  };
  const submitHandler = async () => {
    try {
      addAdminHandler(username, password, confirmPassword);
    } catch (error) {
      console.log(error);
    }
    // empties all fields after submitted to API
    cancelHandler();
  };
  return (
    <GenericModal
      modalHeadingTitle="Add Admin"
      openButtonIcon={<AddIcon sx={{ iconStyle }} />}
      actionButtonTitle="Add"
      cancelButtonTitle="Cancel"
      onActionButtonClick={submitHandler}
      onCancelButtonClick={cancelHandler}
    >
      <TextFieldWithErrorMessage
        label="Username"
        value={username}
        onChange={setUsername}
      />
      <TextFieldWithErrorMessage
        label="Password"
        value={password}
        onChange={setPassword}
      />
      <TextFieldWithErrorMessage
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
    </GenericModal>
  );
}
export function Coaches() {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const cancelHandler = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
  };
  const submitHandler = async () => {
    try {
      addCoachHandler(
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
      );
    } catch (error) {
      console.log(error);
    }
    // empties all fields after submitted to API
    cancelHandler();
  };
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Table2 />
        </Grid>
      </Grid>

      <GenericModal
        modalHeadingTitle="Add Coach"
        openButtonIcon={<AddIcon sx={iconStyle} />}
        actionButtonTitle="Add"
        cancelButtonTitle="Cancel"
        onActionButtonClick={submitHandler}
        onCancelButtonClick={cancelHandler}
      >
        <TextFieldWithErrorMessage
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <TextFieldWithErrorMessage
          label="Last Name"
          value={lastName}
          onChange={setLastName}
        />
        <TextFieldWithErrorMessage
          label="Email"
          value={email}
          onChange={setEmail}
        />
        <TextFieldWithErrorMessage
          label="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <TextFieldWithErrorMessage
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <TextFieldWithErrorMessage
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </GenericModal>
      <AddAdmin />
      <ArchiveCoachModal />
    </div>
  );
}
