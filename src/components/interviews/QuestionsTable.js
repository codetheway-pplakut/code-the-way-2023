import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { getInterviewHandler } from './interviewsHandler';
import { DynamicTable } from '../table-layout/dynamicTable';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';

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
      const response = await getInterviewHandler(interviewId);
      const { data } = response;
      console.log(data.questions);
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
          <Layout title="Interviews">
            <Box sx={{ width: '100%' }}>
              <DynamicTable
                APIcolumns={COLUMNS}
                APIrows={rows}
                refreshTable={request}
                filterBy={['id']}
                defaultFilterBy="id"
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
