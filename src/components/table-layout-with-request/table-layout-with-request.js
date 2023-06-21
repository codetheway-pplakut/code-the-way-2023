import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableLayout } from '../table-layout/table-layout';

export function TableLayoutWithRequest(props) {
  const { columns, requestLabel, subTitle, title, requestFunc } = props;

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

  return (
    <TableLayout
      columns={columns}
      hasError={hasError}
      isLoading={isLoading}
      onRequestClick={request}
      requestLabel={requestLabel}
      rows={rows}
      subTitle={subTitle}
      title={title}
    />
  );
}

TableLayoutWithRequest.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  requestFunc: PropTypes.func.isRequired,
  requestLabel: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

TableLayoutWithRequest.defaultProps = {
  columns: [],
  requestLabel: undefined,
  subTitle: undefined,
  title: undefined,
};
