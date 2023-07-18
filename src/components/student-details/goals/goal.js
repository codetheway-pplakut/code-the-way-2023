import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import propTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DeleteGoalModal, EditGoalModal } from './goal-modals';
import {
  AspirationsCard,
  AspirationsCardHeader,
  AspirationsCardFooter,
} from '../aspirations-card';

export default function Goal(props) {
  const { goal, onSaveSuccess } = props;

  // handles API stuff
  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('No');
  const [explanation, setExplanation] = useState('');

  // controls how much of the explanation is shown
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    if (goal.id) {
      setGoalSet(goal.goalSet ? goal.goalSet : '');
      setDateGoalSet(goal.dateGoalSet ? goal.dateGoalSet : new Date());
      setSEL(goal.sel ? goal.sel : '');
      setGoalReviewDate(goal.goalReviewDate ? goal.goalReviewDate : new Date());
      setWasItAccomplished(
        goal.wasItAccomplished ? goal.wasItAccomplished : 'No'
      );
      setExplanation(goal.explanation ? goal.explanation : '');
    }
  }, [goal]);

  const handleChange = () => {
    setShowMore(!showMore);
  };

  return (
    <Grid padding="5px">
      <AspirationsCard>
        <AspirationsCardHeader header={goalSet} backgroundColor="#f2f2f2">
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
          <Grid item xs={1}>
            <DeleteGoalModal goal={goal} onSaveSuccess={onSaveSuccess} />
          </Grid>
        </AspirationsCardHeader>
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
        <AspirationsCardFooter>
          <Grid item xs={8}>
            <Typography>SEL: {SEL}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Completed: {wasItAccomplished}</Typography>
          </Grid>
        </AspirationsCardFooter>
      </AspirationsCard>
    </Grid>
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
