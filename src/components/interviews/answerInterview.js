import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { set } from 'lodash';
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
import { QandABlock } from './questionAnswerBlock';
import { SubmitInterviewModal } from './submitInterviewModal';

const COLUMNS = [
  {
    id: 'questionInInterviews[0]',
    disablePadding: false,
    label: 'Order',
    align: 'left',
    render: (value, row, refreshTable) =>
      row.questionInInterviews[0].questionOrder,
  },
  {
    id: 'questionString',
    disablePadding: false,
    label: 'Question',
    align: 'left',
  },
  {
    id: 'id',
    disablePadding: false,
    label: 'Options',
    align: 'left',
    render: (value, row, refreshTable) => <EditQuestionModal question={row} />,
  },
];

export function AnswerInterview() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);
  const [answers, setAnswers] = useState([]);
  const location = useLocation();
  const { studentId, interviewId, interviewName } = location.state;
  console.log(studentId);
  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getInterviewAndQuestionsHandler(interviewId);
      const { data } = response;
      setRows(data.questions);
      await setAnswers(new Array(data.questions.length).fill(''));
      console.log(answers);
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
              {rows.map((row, index) => (
                <QandABlock
                  key={row.id}
                  questionNum={index}
                  questionString={row.questionString}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              ))}
              <SubmitInterviewModal
                questions={rows}
                answers={answers}
                interviewId={interviewId}
                studentId={studentId}
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
