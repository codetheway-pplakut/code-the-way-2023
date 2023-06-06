import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutBackButton } from '../layout-back-button/layout-back-button';
// import { LayoutBreadcrumbs } from '../layout-breadcrumbs/layout-breadcrumbs';

export function LayoutToolbar(props) {
  const { actions, showBackButton } = props;
  const hasActions = Boolean(actions.length);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      {showBackButton && <LayoutBackButton />}
      {/* <LayoutBreadcrumbs /> */}
      {hasActions && <Box>{actions}</Box>}
    </Box>
  );
}

LayoutToolbar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  showBackButton: PropTypes.bool,
};

LayoutToolbar.defaultProps = {
  actions: [],
  showBackButton: true,
};
