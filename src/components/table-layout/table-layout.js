import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { Layout } from '../layout/layout';
import { DynamicTable } from './dynamicTable';

export function TableLayout(props) {
  const { columns, subTitle, title, requestFunc } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await requestFunc();
      const { data } = response;
      setRows(data);
    } catch (error) {
      setRows([]);
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <EntitlementRestricted>
      <Layout
        hasError={hasError}
        isLoading={isLoading}
        subTitle={subTitle}
        title={title}
      >
        <DynamicTable APIcolumns={columns} APIrows={rows} />
      </Layout>
    </EntitlementRestricted>
  );
}

TableLayout.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  requestFunc: PropTypes.func.isRequired,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

TableLayout.defaultProps = {
  columns: [],
  subTitle: undefined,
  title: undefined,
};
