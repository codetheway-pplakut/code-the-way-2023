import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  getInterviewAndQuestionsHandler,
  getInterviewHandler,
} from './interviewsHandler';
import { DynamicTable } from '../table-layout/dynamicTable';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { EditQuestionModal } from './editQuestionModal';

const COLUMNS = [
  {
    id: 'questionString',
    disablePadding: false,
    label: 'Question',
    align: 'left',
  },
  {
    id: 'questionInInterviews[0]',
    disablePadding: false,
    label: 'Order',
    align: 'left',
    render: (value, row, refreshTable) =>
      row.questionInInterviews[0].questionOrder,
  },
  {
    id: 'id',
    disablePadding: false,
    label: 'Options',
    align: 'left',
    render: (value, row, refreshTable) => <EditQuestionModal question={row} />,
  },
];

export function QuestionsTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const location = useLocation();
  const { interviewId, interviewName } = location.state;

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getInterviewAndQuestionsHandler(interviewId);
      const { data } = response;
      setRows(data.questions);
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
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title={interviewName}>
            <Box sx={{ width: '100%' }}>
              <DynamicTable
                APIcolumns={COLUMNS}
                APIrows={rows}
                refreshTable={request}
                filterBy={['questionInInterviews[0].questionOrder']}
                defaultFilterBy="questionInInterviews[0].questionOrder"
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
