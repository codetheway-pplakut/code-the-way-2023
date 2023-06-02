import { Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutToolbar } from './layout-toolbar/layout-toolbar';
import { LayoutTitle } from './layout-title/layout-title';

export function Layout(props) {
  const { children, subTitle, title, maxWidth, actions } = props;

  return (
    <Container maxWidth={maxWidth} sx={{ my: 2 }}>
      <LayoutToolbar actions={actions} />
      <LayoutTitle title={title} subTitle={subTitle} />
      {children}
    </Container>
  );
}

Layout.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Layout.defaultProps = {
  actions: undefined,
  children: null,
  maxWidth: 'lg',
  subTitle: undefined,
  title: undefined,
};
