import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import * as moment from 'moment/moment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Goal(props) {
  const { goal, onReload } = props;

  // handles API stuff
  const [goalId, setGoalId] = useState('');
  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(Date);
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(Date);
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  // controls how much of the explanation is shown
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    setGoalId(goal[0]);
    setGoalSet(goal[1]);
    setDateGoalSet(goal[2]);
    setSEL(goal[3]);
    setGoalReviewDate(goal[4]);
    setWasItAccomplished(goal[5]);
    setExplanation(goal[6]);
  }, [goal]);
  const handleChange = () => {
    setShowMore(!showMore);
  };

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
      <Typography
        width="95%"
        sx={{ mx: '2.5%' }}
        paragraph
        gutterBottom
        noWrap={showMore}
      >
        Explanation: {explanation}
      </Typography>
      <Button
        onClick={handleChange}
        startIcon={
          showMore ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
        }
      />
    </Grid>
  );
}
