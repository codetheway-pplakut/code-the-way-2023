import React from 'react';
import { Button, Modal, Box, Grid, Typography, TextField } from '@mui/material';

import { ErrorMessage } from '../error/error-message';
import { ErrorLogic } from '../error/error-logic';
// import { useNavigate } from 'react-router-dom';
import { Layout } from '../layout/layout';

export function Test() {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [text, setText] = React.useState('');
  const [text1, setText1] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorMessage1, setErrorMessage1] = React.useState('');
  const [error, setError] = React.useState(false);
  const [error1, setError1] = React.useState(false);
  const conditions = ['fill', 'short', 'space', 'email'];
  const messages = [
    'Username Must be Filled',
    'Username must be More than 6 Characters',
    'Username Must not Have Spaces',
    'Username Must be an Email',
  ];

  const conditions1 = ['fill', 'short', 'space', 'num', 'spec'];
  const messages1 = [
    'Password Must be Filled',
    'Password Must be More than 6 Characters',
    'Password Must not Have Spaces ',
    'Password Must Have a Number',
    'Password Must Have a Special Character',
  ];
  // const showErrorMessage = Boolean(errorMessage);
  // const textBool =
  //   text1.length < 6 ||
  //   text.length < 6 ||
  //   text.includes(' ') ||
  //   text1.includes(' ') ||
  //   !text.includes('@') ||
  //   !text.includes('.') ||
  //   !specialChars.test(text1) ||
  //   !num.test(text1);
  const errorArray = ErrorLogic(conditions, messages, text);
  const errorArray1 = ErrorLogic(conditions1, messages1, text1);

  const clearText = () => {
    setText('');
    setText1('');
  };

  const submitHandler = () => {
    // eslint-disable-next-line prefer-destructuring
    setErrorMessage(errorArray[1]);
    setErrorMessage1(errorArray1[1]);

    if (errorArray[0] === true) {
      setError(true);
    }

    if (errorArray[0] === false) {
      setError(false);
    }

    if (errorArray1[0] === true) {
      setError1(true);
    }

    if (errorArray1[0] === false) {
      setError1(false);
    }
    if (errorArray[0] === false && errorArray1[0] === false) {
      setErrorMessage('');
      setError(false);
      setError1(false);
      setOpen(false);
      console.log(text);
      console.log(text1);
      clearText();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
    setErrorMessage1('');
    setError(false);
    setError1(false);
    clearText();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Layout
      actions={[
        <Button
          variant="contained"
          key="1"
          color="success"
          onClick={handleOpen}
        >
          Button
        </Button>,
        <Button variant="contained" key="2" sx={{ ml: 2 }} color="error">
          Button 1
        </Button>,
      ]}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          alignItems="center"
          sx={{
            position: 'absolute',
            bgcolor: '#004cbb',
            top: '30%',
            left: '43%',
            width: 430,
            height: 530,
            color: 'white',
          }}
        >
          <Grid container direction="column">
            <Grid item align="center" sx={{ pt: 10 }}>
              <Typography variant="h3"> Admin Modal</Typography>
            </Grid>
            <Grid item align="center" sx={{ pt: 5 }}>
              <Typography variant="body">Type Username and Password</Typography>
            </Grid>
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
                error={error1}
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
            <Grid item align="center" sx={{ pt: 2 }}>
              <ErrorMessage message={errorMessage} show={errorArray[0]} />
            </Grid>
            <Grid item align="center" sx={{ pt: 1 }}>
              <ErrorMessage message={errorMessage1} show={errorArray1[0]} />
            </Grid>
            <Grid item align="center" sx={{ pt: 4 }}>
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
      </Modal>
    </Layout>
  );
}
