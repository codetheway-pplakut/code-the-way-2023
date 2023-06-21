import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DataTable } from '../data-table/data-table';

export function TableLayout(props) {
  const {
    columns,
    rows,
    isLoading,
    hasError,
    onRequestClick,
    subTitle,
    requestLabel,
    title,
  } = props;

  return (
    <EntitlementRestricted>
      <Layout
        hasError={hasError}
        isLoading={isLoading}
        subTitle={subTitle}
        title={title}
      >
        <Button variant="contained" onClick={onRequestClick}>
          {requestLabel}
        </Button>
        <DataTable columns={columns} rows={rows} />
      </Layout>
    </EntitlementRestricted>
  );
}
TableLayout.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  onRequestClick: PropTypes.func,
  requestLabel: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

TableLayout.defaultProps = {
  columns: [],
  hasError: false,
  isLoading: false,
  onRequestClick: undefined,
  requestLabel: 'Request',
  rows: [],
  subTitle: undefined,
  title: undefined,
};
