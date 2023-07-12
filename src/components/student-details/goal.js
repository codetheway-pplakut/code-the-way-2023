import React, { useState, useEffect } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import propTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/system';
import { EditGoalModal } from './goal-modals';

export default function Goal(props) {
  const { goal, onSaveSuccess } = props;

  // handles API stuff
  const [goalId, setGoalId] = useState('');
  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  // controls how much of the explanation is shown
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    if (goal.id) {
      setGoalId(goal.id);
      setGoalSet(goal.goalSet ? goal.goalSet : '');
      setDateGoalSet(goal.dateGoalSet ? goal.dateGoalSet : new Date());
      setSEL(goal.sel ? goal.sel : '');
      setGoalReviewDate(goal.goalReviewDate ? goal.goalReviewDate : new Date());
      setWasItAccomplished(
        goal.wasItAccomplished ? goal.wasItAccomplished : ''
      );
      setExplanation(goal.explanation ? goal.explanation : '');
    }
  }, [goal]);
  const handleChange = () => {
    setShowMore(!showMore);
  };

  return (
    <Box sx={{ borderRadius: '10px', boxShadow: 2, mb: 2 }}>
      <Grid container direction="column">
        <Box
          sx={{
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            padding: '6px',
          }}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography>Goal: {goalSet}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{SEL}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                Goal set: {dayjs(dateGoalSet).format('MMM DD, YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <EditGoalModal goal={goal} onSaveSuccess={onSaveSuccess} />
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
        </Box>

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
        <Box
          sx={{
            borderBottomLeftRadius: '10px',
            borderBottomRightRaidus: '10px',
            bgcolor: '#f5f5f5',
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                Review Date: {dayjs(goalReviewDate).format('MMM DD, YYYY')}
              </Typography>
              <Grid item xs={6}>
                <Typography>
                  Was it accomplished: {wasItAccomplished}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

Goal.propTypes = {
  goal: propTypes.object,
  onSaveSuccess: propTypes.func,
};
Goal.defaultProps = {
  goal: undefined,
  onSaveSuccess: undefined,
};
