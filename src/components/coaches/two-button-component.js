import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';

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

export function TwoButtonComponent(props) {
  const { actionName } = props;
  const { open, setOpen } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" spacing={0} justifyContent="right" padding={3}>
      <Button
        variant="text"
        onClick={props.handleClose}
        spacing={2}
        sx={buttonBackground}
        theme={buttonTheme}
        color="cancel"
      >
        <Typography style={buttonText}>Cancel</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={props.handleClose}
        sx={buttonBackground}
        theme={buttonTheme}
        color="archive"
      >
        <Typography style={buttonText}>{actionName}</Typography>
      </Button>
    </Stack>
  );
}

export default TwoButtonComponent;

TwoButtonComponent.propTypes = {
  actionName: PropTypes.object.isRequired,
};
