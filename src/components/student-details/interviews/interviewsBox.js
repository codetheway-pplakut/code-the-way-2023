import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { LayoutPreloader } from '../../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../../layout/layout-error/layout-error';
import {
  getStudentInterviewResponsesHandler,
  getStudentInterviewsHandler,
} from '../../interviews/interviewsHandler';

export function InterviewsBox(props) {
  const { student } = props;
  const studentId = student.id;
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchGoals = () => {
      setIsLoading(true);
      setHasError(false);

      getStudentInterviewsHandler(studentId).then((response) => {
        setInterviews(response.data);
      });
      setIsLoading(false);
    };
    fetchGoals();
  }, [studentId]);

  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  if (interviews.length === 0) {
    return (
      <Grid>
        <Grid container>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography fontSize="30px">
                {student.studentFirstName} {student.studentLastName}&apos;s
                Interviews
              </Typography>
            </Grid>
            <Grid item xs={1} TODO />
          </Grid>
        </Grid>
        <Typography>Interviews</Typography>
      </Grid>
    );
  }

  return (
    <Grid>
      {interviews && interviews.length > 0 ? (
        interviews.map((interview) => (
          <Grid item xs={12} key={interview.interview.id}>
            <Typography>{interview.interview.interviewName}</Typography>
            <Grid item xs={12}>
              {interview.answers.map((answer) => (
                <Box key={answer.id}>
                  <Typography>Question: {answer.questionString}</Typography>
                  <Typography>Answer: {answer.answerString}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography>No communications found</Typography>
      )}
    </Grid>
  );
}

InterviewsBox.propTypes = {
  student: propTypes.string.isRequired,
};
