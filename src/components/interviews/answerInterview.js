import React, { useEffect, useState } from 'react';

import { Button, Grid, Box, Typography } from '@mui/material';
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
import {
  AspirationsCardHeader,
  AspirationsCardFooter,
} from '../student-details/aspirations-card';

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

  function CustomSubmitInterviewModal() {
    return (
      <Box
        sx={{
          borderRadius: 1,
          bgcolor: '#6DBB7A',
          p: 2,
          textAlign: 'center',
          boxShadow: 2,
        }}
      >
        <Typography sx={{ color: '#ffffff', fontWeight: 'medium' }}>
          Submit Interview
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item justifyContent="center">
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
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: '10px',
                boxShadow: 5,
                mb: 1,
                bgcolor: '#ffffff',
                marginTop: 3,
                width: '75vw',
              }}
            >
              <AspirationsCardHeader>
                <Grid
                  xs={12}
                  padding={2}
                  fontSize={30}
                  fontWeight="medium"
                  color="#505050"
                  align="center"
                >
                  {interviewName}
                </Grid>
              </AspirationsCardHeader>
              <Box px={20} pb={4}>
                {rows.map((row, index) => (
                  <QandABlock
                    key={row.id}
                    questionNum={index}
                    questionString={row.questionString}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                ))}
              </Box>
              <AspirationsCardFooter>
                <Grid xs={12} align="center" padding={2}>
                  <SubmitInterviewModal
                    questions={rows}
                    answers={answers}
                    interviewId={interviewId}
                    interviewName={interviewName}
                    studentId={studentId}
                  />
                </Grid>
              </AspirationsCardFooter>
            </Box>
          </Grid>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
