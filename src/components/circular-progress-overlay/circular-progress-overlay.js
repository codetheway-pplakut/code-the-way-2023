import { Box, CircularProgress, Fade } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export function CircularProgressOverlay(props) {
  const { active } = props;

  if (!active) return null;

  return (
    <Fade in>
      <Box
        sx={{
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    </Fade>
  );
}

CircularProgressOverlay.propTypes = {
  active: PropTypes.bool,
};

CircularProgressOverlay.defaultProps = {
  active: false,
};
