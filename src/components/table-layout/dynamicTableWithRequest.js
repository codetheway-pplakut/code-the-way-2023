import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DynamicTable } from './dynamicTable';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';

export function DynamicTableWithRequest(props) {
  const { columns, filterBy, requestFunc } = props;

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

  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <DynamicTable APIcolumns={columns} APIrows={rows} filterBy={filterBy}>
      {props.children}
    </DynamicTable>
  );
}

DynamicTableWithRequest.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  requestFunc: PropTypes.func,
  filterBy: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

DynamicTableWithRequest.defaultProps = {
  columns: [],
  requestFunc: () => {},
  filterBy: [],
};
