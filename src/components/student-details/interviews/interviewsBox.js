import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Box } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import { LayoutPreloader } from '../../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../../layout/layout-error/layout-error';

import {
  getStudentInterviewResponsesHandler,
  getStudentInterviewsHandler,
} from '../../interviews/interviewsHandler';
import {
  AspirationsCard,
  AspirationsCardFooter,
  AspirationsCardHeader,
} from '../aspirations-card';

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
            <Grid item xs={12}>
              <Typography fontSize="2vw">
                {student.studentFirstName} {student.studentLastName}&apos;s
                Interviews
              </Typography>
            </Grid>
            <Grid item xs={1} TODO />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid>
      <Typography fontSize="2vw" paddingBottom="1vh">
        {student.studentFirstName} {student.studentLastName}&apos;s Interviews
      </Typography>
      {interviews && interviews.length > 0 ? (
        interviews.map((interview) => (
          <Grid key={interview.interview.id}>
            <AspirationsCard>
              <AspirationsCardHeader>
                <Typography fontSize="1.5vw" fontWeight="medium">
                  {interview.interview.interviewName}
                </Typography>
              </AspirationsCardHeader>

              <Grid item xs={12} px={3}>
                {interview.answers.map((answer) => (
                  <Box key={answer.id} paddingTop={2}>
                    <Grid container direction="row">
                      <Grid item xs={2}>
                        <Typography fontSize={18} fontWeight="medium">
                          Question:
                        </Typography>
                      </Grid>
                      <Grid item xs={10} fontWeight="medium">
                        {answer.questionString}
                      </Grid>
                    </Grid>
                    <Grid container direction="row">
                      <Grid item xs={2}>
                        <Typography fontSize={18} fontWeight="medium">
                          Answer:
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {answer.answerString === '' ? (
                          <Typography color="#828282">
                            No answer given
                          </Typography>
                        ) : (
                          <Typography color="#828282">
                            {answer.answerString}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    <Divider />
                  </Box>
                ))}
              </Grid>
            </AspirationsCard>
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
