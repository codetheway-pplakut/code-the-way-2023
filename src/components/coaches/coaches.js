import React from 'react';
import { Box, Grid } from '@mui/material';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getActiveCoaches } from '../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { AddCoachModal } from './modal-component';

const COLUMNS = [
  {
    id: 'coachFirstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachLastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachEmail',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    active: false,
  },
  {
    id: 'coachPhoneNumber',
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
    active: false,
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
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Coaches">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveCoaches}
                filterBy={['coachFirstName']}
              >
                <AddCoachModal />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
