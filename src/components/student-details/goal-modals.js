import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import uuid from 'react-uuid';
import propTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import {
  editGoalHandler,
  addGoalHandler,
  deleteGoalHandler,
  altDeleteGoalHandler,
} from './goalsHandler';

export function EditGoalModal(props) {
  const { goal, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    setGoalSet(goal.goalSet);
    setDateGoalSet(goal.dateGoalSet);
    setSel(goal.sel);
    setGoalReviewDate(goal.goalReviewDate);
    setWasItAccomplished(goal.wasItAccomplished);
    setExplanation(goal.explanation);
  }, [goal]);

  const requestSave = async () => {
    console.log('save requested');
    try {
      await editGoalHandler(
        goal.id,
        goal.studentId,
        goalSet,
        dateGoalSet,
        sel,
        goalReviewDate,
        wasItAccomplished,
        explanation
      );
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Edit Goal"
      onActionButtonClick={requestSave}
      openButtonIcon={<EditIcon />}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="spaceBetween"
      >
        <Grid item mb={2}>
          <TextFieldWithErrorMessage
            label="Goal"
            onChange={(value) => setGoalSet(value)}
            value={goalSet}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Date Goal Set"
              value={dayjs(dateGoalSet)}
              onChange={(newValue) => setDateGoalSet(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="SEL"
            onChange={(value) => setSel(value)}
            value={sel}
          />
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Accomplished?"
            onChange={(value) => setWasItAccomplished(value)}
            value={wasItAccomplished}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Goal Review Date"
              value={dayjs(goalReviewDate)}
              onChange={(newValue) => setGoalReviewDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Explanation"
            onChange={(value) => setExplanation(value)}
            value={explanation}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

export function AddGoalModal(props) {
  const { student, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  const requestSubmit = async () => {
    await addGoalHandler(
      uuid(),
      student.id,
      goalSet,
      dateGoalSet,
      sel,
      goalReviewDate,
      wasItAccomplished,
      explanation
    );

    if (onSaveSuccess) onSaveSuccess();
  };
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Goal"
      onActionButtonClick={requestSubmit}
      openButtonIcon={<AddIcon />}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="spaceBetween"
      >
        <Grid item mb={2}>
          <TextFieldWithErrorMessage
            label="Goal"
            onChange={(value) => setGoalSet(value)}
            value={goalSet}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Date Goal Set"
              value={dayjs(dateGoalSet)}
              onChange={(newValue) => setDateGoalSet(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="SEL"
            onChange={(value) => setSel(value)}
            value={sel}
          />
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Accomplished?"
            onChange={(value) => setWasItAccomplished(value)}
            value={wasItAccomplished}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Goal Review Date"
              value={dayjs(goalReviewDate)}
              onChange={(newValue) => setGoalReviewDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Explanation"
            onChange={(value) => setExplanation(value)}
            value={explanation}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}

export function DeleteGoalModal(props) {
  const { goal, onSaveSuccess } = props;
  // TODO add try catch
  const requestDelete = async () => {
    try {
      await deleteGoalHandler(goal);
    } catch (error) {
      console.log(error);
    } finally {
      if (onSaveSuccess) onSaveSuccess();
    }
  };

  return (
    <GenericModal
      modalHeadingTitle="Delete Goal"
      modalMessage="Are You Sure ?"
      cancelButtonTitle="No"
      actionButtonTitle="Yes"
      onActionButtonClick={requestDelete}
      openButtonIcon={<DeleteIcon />}
    />
  );
}

DeleteGoalModal.propTypes = {
  goal: propTypes.object,
  onSaveSuccess: propTypes.func,
};
DeleteGoalModal.defaultProps = {
  goal: undefined,
  onSaveSuccess: undefined,
};
AddGoalModal.propTypes = {
  student: propTypes.func,
  onSaveSuccess: propTypes.func,
};
AddGoalModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};
EditGoalModal.propTypes = {
  student: propTypes.func,
  onSaveSuccess: propTypes.func,
};
EditGoalModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};
