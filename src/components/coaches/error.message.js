import React from 'react';
import { Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

export function ErrorMessage(props) {
  // eslint-disable-next-line react/prop-types
  const { message, show } = props;

  const errorMessage = () => {
    if (show === true) {
      return message;
    }

    return '';
  };

  return <Typography sx={{ color: pink[500] }}>{message}</Typography>;
}
