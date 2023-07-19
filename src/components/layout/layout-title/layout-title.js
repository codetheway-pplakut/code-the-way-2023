import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export function LayoutTitle(props) {
  const { subTitle, title } = props;

  const hasSubTitle = Boolean(subTitle);
  const hasTitle = Boolean(title);

  if (!hasSubTitle && !hasTitle) return null;

  return (
    <Box sx={{ my: 2 }}>
      {hasTitle && (
        <Typography variant="h2" sx={{ fontSize: '7vh' }}>
          {title}
        </Typography>
      )}
      {hasSubTitle && (
        <Typography variant="h6" color="text.secondary">
          {subTitle}
        </Typography>
      )}
    </Box>
  );
}

LayoutTitle.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

LayoutTitle.defaultProps = {
  subTitle: undefined,
  title: undefined,
};
