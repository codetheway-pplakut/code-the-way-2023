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
        <Grid container width={{ xs: '85vw', md: '45vw' }}>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography fontSize="2vw">
                {student.studentFirstName} {student.studentLastName}&apos;s
                Interviews
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography>No interviews found</Typography>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Typography fontSize="2vw" paddingBottom="1vh">
        {student.studentFirstName} {student.studentLastName}&apos;s Interviews
      </Typography>
      {interviews && interviews.length > 0 ? (
        interviews.map((interview) => (
          <Grid key={interview.interview.id} paddingBottom={2}>
            <AspirationsCard>
              <AspirationsCardHeader>
                <Grid item xs={12} align="center">
                  <Typography fontSize="1.5vw" fontWeight="medium" padding={1}>
                    {interview.interview.interviewName}
                  </Typography>
                </Grid>
              </AspirationsCardHeader>

              <Grid>
                {interview.answers.map((answer) => (
                  <Box key={answer.id} paddingTop={2} px={2}>
                    <Grid container direction="row">
                      <Grid item xs={2}>
                        <Typography fontSize={18} fontWeight="medium">
                          Question:
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {answer.questionString}
                      </Grid>
                    </Grid>
                    <Grid container direction="row" paddingBottom={2}>
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
        <Typography>No communications found</Typography> // TODO: get rid of this
      )}
    </Grid>
  );
}

InterviewsBox.propTypes = {
  student: propTypes.string.isRequired,
};
