import React from 'react';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getInterviewHandler } from './interviewsHandler';

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
  return (
    <React.Fragment>
      <h1>Interview</h1>
      <DynamicTableWithRequest
        columns={COLUMNS}
        requestFunc={getInterviewHandler}
        requestData={interviewId}
      />
    </React.Fragment>
  );
}
