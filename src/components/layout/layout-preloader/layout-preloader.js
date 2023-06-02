import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export function LayoutPreloader(props) {
  const { label } = props;
  const hasLabel = Boolean(label);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      {hasLabel && <Typography sx={{ m: 2 }}>{label}</Typography>}
    </Box>
  );
}

LayoutPreloader.propTypes = {
  label: PropTypes.string,
};

LayoutPreloader.defaultProps = {
  label: undefined,
};
