import React, { useEffect, useState } from 'react';
import { getInterviewHandler } from './interviewsHandler';
import { DynamicTable } from '../table-layout/dynamicTable';

const interviewId = '92ad7555-1de2-4c82-9cbb-1e24117f0626';

const COLUMNS = [
  {
    id: 'questionString',
    disablePadding: false,
    label: 'Question',
    align: 'left',
  },
];

export function QuestionsTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getInterviewHandler(interviewId).questions;
      console.log(response);
      const { data } = response;
      setRows(data);
      console.log(rows);
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
    <React.Fragment>
      <h1>Interview</h1>
      <DynamicTable
        APIcolumns={COLUMNS}
        APIrows={rows}
        refreshTable={request}
      />
    </React.Fragment>
  );
}
