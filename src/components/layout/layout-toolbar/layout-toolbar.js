import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutBackButton } from '../layout-back-button/layout-back-button';
import { LayoutBreadcrumbs } from '../layout-breadcrumbs/layout-breadcrumbs';

export function LayoutToolbar(props) {
  const { actions, showBackButton } = props;
  const hasActions = Boolean(actions.length);

  return (
    <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
      {showBackButton && <LayoutBackButton />}
      <LayoutBreadcrumbs />
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
