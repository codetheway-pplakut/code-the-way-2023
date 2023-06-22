import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export function ActivateButton(props) {
  const { id } = props;
  // eslint-disable-next-line no-alert
  const onClick = () => alert(id);

  return (
    <Button variant="contained" onClick={onClick}>
      Activate
    </Button>
  );
}

ActivateButton.propTypes = {
  id: PropTypes.number.isRequired,
};
