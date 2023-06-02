import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutToolbar } from './layout-toolbar/layout-toolbar';
import { LayoutTitle } from './layout-title/layout-title';
import { LayoutPreloader } from './layout-preloader/layout-preloader';

export function Layout(props) {
  const { actions, children, isLoading, maxWidth, secondary, subTitle, title } =
    props;

  if (isLoading) return <LayoutPreloader label="Loading tabular data..." />;

  const hasSecondary = Boolean(secondary);
  const primaryGridSize = hasSecondary ? 8 : 12;

  return (
    <Container maxWidth={maxWidth} sx={{ flex: 1, overflowY: 'auto' }}>
      <Box sx={{ pt: 2, pb: 8 }}>
        <LayoutToolbar actions={actions} />
        <LayoutTitle title={title} subTitle={subTitle} />
        {!hasSecondary ? (
          children
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={primaryGridSize}>
              {children}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                {secondary}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

Layout.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  maxWidth: PropTypes.string,
  secondary: PropTypes.node,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Layout.defaultProps = {
  actions: undefined,
  children: null,
  isLoading: false,
  maxWidth: 'lg',
  secondary: undefined,
  subTitle: undefined,
  title: undefined,
};
