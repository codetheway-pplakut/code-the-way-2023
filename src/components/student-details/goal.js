import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import * as moment from 'moment/moment';

export default function Goal(props) {
  const { goal, onReload } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(Date);
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(Date);
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');
  useEffect(() => {
    setGoalSet(goal[0]);
    setDateGoalSet(goal[1]);
    setSEL(goal[2]);
    setGoalReviewDate(goal[3]);
    setWasItAccomplished(goal[4]);
    setExplanation(goal[5]);
  }, [goal]);

  return (
    <Grid container direction="column" sx={{ border: '1px solid black' }}>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ border: '2px solid gray' }}
      >
        <Typography>Goal: {goalSet}</Typography>
        <Typography>{SEL}</Typography>
        {/* Formats dates with the Moment library */}
        {/* splits so it only shows year/month/day */}
        <Typography>
          {/* prettier doesn't like me :( */}
          Goal set: {moment(dateGoalSet, 'YYYY-MM-DD').format().split('T')[0]}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {/* see dateGoalSet comments */}
        <Typography>
          Review Date:{' '}
          {moment(goalReviewDate, 'YYYY-MM-DD').format().split('T')[0]}
        </Typography>
        <Typography>Was it accomplished: {wasItAccomplished}</Typography>
      </Grid>
      <Typography width="100%" paragraph gutterBottom noWrap>
        Explanation: {explanation}
      </Typography>
    </Grid>
  );
}
