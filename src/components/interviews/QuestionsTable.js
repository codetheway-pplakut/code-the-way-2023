import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getInterviewAndQuestionsHandler } from './interviewsHandler';
import { DynamicTable } from '../table-layout/dynamicTable';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { Layout } from '../layout/layout';
import { RestrictedRestricted } from '../entitlement-restricted/restricted-restricted';
import { EditQuestionModal } from './editQuestionModal';
import AddQuestionModal from './addQuestionModal';
import { RemoveQuestionModal } from './removeQuestionHandler';

export function QuestionsTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);
  const [interview, setInterview] = useState({});

  const location = useLocation();
  const { interviewId, interviewName } = location.state;
  const navigate = useNavigate();

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getInterviewAndQuestionsHandler(interviewId);
      const { data } = response;
      setInterview(data);
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

  const COLUMNS = [
    {
      id: 'questionString',
      disablePadding: false,
      label: 'Question',
      align: 'left',
      hideOrder: true,
    },
    {
      id: 'order',
      disablePadding: false,
      label: 'Order',
      align: 'left',
      render: (value, row, refreshTable) => row.order,
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Options',
      align: 'left',
      hideOrder: true,

      render: (value, row, refreshTable) => (
        <React.Fragment>
          <EditQuestionModal
            interviewId={interviewId}
            question={row}
            onSubmit={refreshTable}
          />
          <RemoveQuestionModal
            interview={interview}
            questionId={row.id}
            onRemoval={refreshTable}
            questionName={row.questionString}
          />
        </React.Fragment>
      ),
    },
  ];

  const onClick = () => navigate('/Interviews');

  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <RestrictedRestricted>
          <Button
            onClick={onClick}
            size="small"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ m: 5, my: 0, mt: 5 }}
          >
            Back to Interviews
          </Button>
          <Layout title={interviewName}>
            <Box sx={{ width: '100%' }}>
              <DynamicTable
                APIcolumns={COLUMNS}
                APIrows={rows}
                refreshTable={request}
                filterBy={['questionString']}
                defaultFilterBy="order"
              >
                <AddQuestionModal
                  questions={rows}
                  interviewId={interviewId}
                  interviewName={interviewName}
                  onSubmit={request}
                />
              </DynamicTable>
            </Box>
          </Layout>
        </RestrictedRestricted>
      </Grid>
    </Grid>
  );
}
