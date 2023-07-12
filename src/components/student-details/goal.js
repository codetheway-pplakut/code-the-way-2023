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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ px: '2vw', py: '1vh' }}
        >
          <Grid item xs={7}>
            <Typography fontSize={20} fontWeight="medium" color="#505050">
              {goalSet}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              Goal Set:
              <br /> {dayjs(dateGoalSet).format('MMM DD, YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              Review Date: <br />
              {dayjs(goalReviewDate).format('MMM DD, YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <EditGoalModal goal={goal} onSaveSuccess={onSaveSuccess} />
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
        <Typography
          width="95%"
          sx={{ px: '2vw', color: '#595959', marginTop: 1 }}
          paragraph
          gutterBottom
          noWrap={showMore}
        >
          {explanation}
        </Typography>
        <Button
          onClick={handleChange}
          startIcon={
            showMore ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
          }
        />
        <Grid
          container
          alignItems="center"
          sx={{
            px: '2vw',
            py: '2vh',
            bgcolor: '#f5f5f5',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
        >
          <Grid item xs={8}>
            <Typography>SEL: {SEL}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Completed: {wasItAccomplished}</Typography>
          </Grid>
        </Grid>
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
