import React from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  createTheme,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../error/error-message';
import { ErrorLogic } from '../error/error-logic';
// import { useNavigate } from 'react-router-dom';

const buttonTheme = createTheme({
  palette: {
    archive: {
      main: '#EC6E6E',
      contrastText: '#fff',
    },
    cancel: {
      main: '#6C6C6C',
      contrastText: '#868686',
    },
  },
});

const buttonText = {
  fontSize: '20px',
  fontFamily: 'roboto',
};

const buttonBackground = {
  minWidth: '130px',
  minHeight: '50px',
};

// Footer styling
const footerStyle = {
  bgcolor: '#F2F2F2',
  color: 'white',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

export function FieldComponent(props) {
  // const navigate = useNavigate();
  const { handleClose } = props;
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
    setErrorMessage(errorArray[1]);
    setErrorMessage1(errorArray1[1]);
    setError(errorArray[0]);
    setError1(errorArray1[0]);
    if (!errorArray[0] && !errorArray1[0]) {
      setErrorMessage('');
      setError(false);
      setError1(false);
      console.log(text);
      console.log(text1);
      clearText();
      handleClose();
    }
  };

  const handleEntry = () => {
    setErrorMessage('');
    setErrorMessage1('');
    setError(false);
    setError1(false);
    clearText();
    handleClose();
  };
  const buttonArray = [
    // [title, functionality, color, key, variant]
    ['Cancel', handleClose, 'cancel', 'key2', 'text'],
    ['Submit', submitHandler, 'success', 'key1', 'contained'],
  ];

  return (
    <div>
      <Grid item align="center">
        <TextField
          error={error}
          size="small"
          id="filled-basic"
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

      <Grid item sx={footerStyle} xs={12}>
        <Stack direction="row" spacing={0} justifyContent="right" padding={3}>
          {/* Array Mapping of Buttons */}

          {buttonArray.map((button) => (
            <Button
              key={button[3]}
              variant={button[4]}
              onClick={button[1]}
              spacing={2}
              sx={buttonBackground}
              theme={buttonTheme}
              color={button[2]}
            >
              <Typography style={buttonText}>{button[0]}</Typography>
            </Button>
          ))}
        </Stack>
      </Grid>
    </div>
  );
}

FieldComponent.propTypes = {
  handleClose: PropTypes.element.isRequired,
};

export default FieldComponent;
