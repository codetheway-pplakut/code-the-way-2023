import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export function ModalMessageComponent(props) {
  const { modalMessage } = props;
  return (
    <div>
      <Typography padding={5} align="center" fontSize={20}>
        {modalMessage}
      </Typography>
    </div>
  );
}

ModalMessageComponent.propTypes = {
  modalMessage: PropTypes.string.isRequired,
};

export default ModalMessageComponent;
