import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutToolbar } from './layout-toolbar/layout-toolbar';
import { LayoutTitle } from './layout-title/layout-title';

export function Layout(props) {
  const { children, subTitle, title, maxWidth, actions, secondary } = props;

  const hasSecondary = Boolean(secondary);
  const primaryGridSize = hasSecondary ? 8 : 12;

  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ pt: 2, pb: 8 }}>
        <LayoutToolbar actions={actions} />
        <LayoutTitle title={title} subTitle={subTitle} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={primaryGridSize}>
            {children}
          </Grid>
          {hasSecondary && (
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                {secondary}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

Layout.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  secondary: PropTypes.node,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Layout.defaultProps = {
  actions: undefined,
  children: null,
  maxWidth: 'lg',
  secondary: undefined,
  subTitle: undefined,
  title: undefined,
};
