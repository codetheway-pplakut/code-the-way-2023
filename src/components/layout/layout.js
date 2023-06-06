import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutToolbar } from './layout-toolbar/layout-toolbar';
import { LayoutTitle } from './layout-title/layout-title';
import { LayoutPreloader } from './layout-preloader/layout-preloader';
import { LayoutError } from './layout-error/layout-error';

const BASE_BOX_STYLES = {
  boxSizing: 'border-box',
  flex: 1,
  p: 2,
};

export function Layout(props) {
  const {
    actions,
    children,
    errorLabel,
    errorOnRetryClick,
    errorTitle,
    hasError,
    isLoading,
    maxWidth,
    scrollable,
    secondary,
    showBackButton,
    subTitle,
    title,
  } = props;

  if (isLoading) return <LayoutPreloader />;

  if (hasError)
    return (
      <LayoutError
        label={errorLabel}
        onRetryClick={errorOnRetryClick}
        title={errorTitle}
      />
    );

  const hasSecondary = Boolean(secondary);
  const primaryGridSize = hasSecondary ? 8 : 12;

  const boxSx = scrollable
    ? { ...BASE_BOX_STYLES, overflowY: 'auto' }
    : {
        ...BASE_BOX_STYLES,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      };

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Box sx={boxSx}>
        <LayoutToolbar actions={actions} showBackButton={showBackButton} />
        <LayoutTitle title={title} subTitle={subTitle} />
        {!hasSecondary ? (
          children
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={primaryGridSize}>
              {children}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" elevation={0} sx={{ p: 2, mb: 2 }}>
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
  errorLabel: PropTypes.string,
  errorOnRetryClick: PropTypes.func,
  errorTitle: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxWidth: PropTypes.string,
  scrollable: PropTypes.bool,
  secondary: PropTypes.node,
  showBackButton: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Layout.defaultProps = {
  actions: undefined,
  children: null,
  errorLabel: undefined,
  errorOnRetryClick: undefined,
  errorTitle: undefined,
  hasError: false,
  isLoading: false,
  maxWidth: 'xl',
  scrollable: true,
  secondary: undefined,
  showBackButton: undefined,
  subTitle: undefined,
  title: undefined,
};
