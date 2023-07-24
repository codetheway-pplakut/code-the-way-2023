import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getInterviewAndQuestionsHandler } from './interviewsHandler';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { EditQuestionModal } from './editQuestionModal';
import { QandABlock } from './questionAnswerBlock';
import { SubmitInterviewModal } from './submitInterviewModal';

export default function AnswerInterview() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);
  const [answers, setAnswers] = useState([]);
  const location = useLocation();
  const { studentId, interviewId, interviewName } = location.state;

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getInterviewAndQuestionsHandler(interviewId);
      const { data } = response;
      setRows(data.questions);
      await setAnswers(new Array(data.questions.length).fill(''));
    } catch (error) {
      setRows([]);
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  const navigate = useNavigate();
  const onClick = () => navigate('/students');

  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Button
            onClick={onClick}
            size="small"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ m: 5, my: 0, mt: 5 }}
          >
            Back to Students
          </Button>
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
                interviewName={interviewName}
                studentId={studentId}
              />
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
