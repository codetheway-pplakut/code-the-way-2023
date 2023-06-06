import { Avatar, Box, Typography, Button } from '@mui/material';
import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
import PropTypes from 'prop-types';
import { pink } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';

export function LayoutError(props) {
  const { label, onRetryClick, title } = props;
  const hasOnRetryClick = Boolean(onRetryClick);

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
      <Avatar sx={{ bgcolor: pink[500], mx: 'auto', mb: 2 }}>
        <ReportIcon />
      </Avatar>
      <Typography variant="h4" sx={{ m: 2 }}>
        {title}
      </Typography>
      <Typography paragraph sx={{ mx: 2 }}>
        {label}
      </Typography>
      {hasOnRetryClick && (
        <Button
          onClick={onRetryClick}
          startIcon={<ReplayIcon />}
          variant="contained"
        >
          Retry
        </Button>
      )}
    </Box>
  );
}

LayoutError.propTypes = {
  label: PropTypes.string,
  onRetryClick: PropTypes.func,
  title: PropTypes.string,
};

LayoutError.defaultProps = {
  label: 'Sorry, an unexpected error has occurred.',
  onRetryClick: undefined,
  title: 'Error loading.',
};
