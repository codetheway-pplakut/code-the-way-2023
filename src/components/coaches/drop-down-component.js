import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  MenuItem,
  TextField,
  createTheme,
  Typography,
  Button,
  Stack,
} from '@mui/material';

export function DropDownComponent(props) {
  const [selectedCoach, setSelectedCoach] = useState('');
  const {
    actionButtonFunction,
    actionButtonColor,
    actionButtonTitle,
    cancelButtonTitle,
    handleClose,
  } = props;

  const coachNames = ['Bob the coach', 'Mr. O', 'Jeff'];

  const transformedArray = coachNames.map((name, index) => ({
    value: (index + 1).toString(),
    label: name,
  }));

  const handleCoachChange = (event) => {
    setSelectedCoach(event.target.value);
  };

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
      submit: {
        main: '#6DBB7A',
        contrastText: '#fff',
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

  const test = [
    {
      value: 'hi',
      label: 'Coach 1',
    },
    {
      value: 'test',
      label: 'Coach 2',
    },
    {
      value: 'ok',
      label: 'Coach 3',
    },
    {
      value: 'here',
      label: 'Coach 4',
    },
  ];

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField id="test" select label="Select" defaultValue="here">
          {test.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Grid sx={{ pt: 4 }} />
      </div>
    </Grid>
  );

  return (
    <div>
      {content}
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
            <Typography style={buttonText}>{cancelButtonTitle}</Typography>
          </Button>
          <Button
            variant="contained"
            onClick={handleCoachChange}
            sx={buttonBackground}
            theme={buttonTheme}
            color={actionButtonColor}
          >
            <Typography style={buttonText}>{actionButtonTitle}</Typography>
          </Button>
        </Stack>
      </Grid>
    </div>
  );
}

DropDownComponent.propTypes = {
  actionButtonFunction: PropTypes.element.isRequired,
  actionButtonTitle: PropTypes.string.isRequired,
  cancelButtonTitle: PropTypes.string.isRequired,
  actionButtonColor: PropTypes.string.isRequired,
  handleClose: PropTypes.element.isRequired,
};
