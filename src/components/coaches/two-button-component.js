import React from 'react';
import { Button, Typography, Grid, createTheme, Stack } from '@mui/material';
import PropTypes from 'prop-types';

// Footer styling
const footerStyle = {
  bgcolor: '#F2F2F2',
  color: 'white',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

// Button styling
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
  const {
    actionButtonFunction,
    actionName,
    cancelButton,
    usingTwoButtonFormat,
    handleClose,
  } = props;

  return (
    <div>
      {usingTwoButtonFormat && (
        <Grid item sx={footerStyle} xs={12}>
          <Stack direction="row" spacing={0} justifyContent="right" padding={3}>
            <Button
              variant="text"
              onClick={handleClose}
              spacing={2}
              sx={buttonBackground}
              theme={buttonTheme}
              color="cancel"
            >
              <Typography style={buttonText}>{cancelButton}</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                actionButtonFunction();
                handleClose();
              }}
              sx={buttonBackground}
              theme={buttonTheme}
              color="archive"
            >
              <Typography style={buttonText}>{actionName}</Typography>
            </Button>
          </Stack>
        </Grid>
      )}
    </div>
  );
}

TwoButtonComponent.propTypes = {
  actionButtonFunction: PropTypes.element.isRequired,
  actionName: PropTypes.string.isRequired,
  cancelButton: PropTypes.string.isRequired,
  usingTwoButtonFormat: PropTypes.bool.isRequired,
  handleClose: PropTypes.element.isRequired,
};

export default TwoButtonComponent;
