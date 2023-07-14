import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid, Typography, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import uuid from 'react-uuid';
import AddIcon from '@mui/icons-material/Add';
import propTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericModal } from '../../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../../shared/text-field-with-error-message';
import {
  editGoalHandler,
  addGoalHandler,
  deleteGoalHandler,
} from './goalHandlers';

export function EditGoalModal(props) {
  const { goal, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('No');
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
      actionButtonTitle="Confirm"
      actionButtonColor="submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Edit Goal"
      modalMessage="Fill out the fields below to edit a goal."
      onActionButtonClick={requestSave}
      openButtonIcon={<EditIcon />}
    >
      <Grid container alignItems="center" px={4} py={2} spacing={1}>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Goal Title"
            onChange={(value) => setGoalSet(value)}
            value={goalSet}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                margin="normal"
                label="Date Goal Set"
                value={dayjs(dateGoalSet)}
                onChange={(newValue) => setDateGoalSet(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                margin="normal"
                label="Goal Review Date"
                value={dayjs(goalReviewDate)}
                onChange={(newValue) => setGoalReviewDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Explanation"
            onChange={(value) => setExplanation(value)}
            value={explanation}
            minRows={3}
          />
        </Grid>

        <Grid
          item
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="SEL"
              onChange={(value) => setSel(value)}
              value={sel}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>Completed</Typography>
              <Checkbox
                checked={wasItAccomplished === 'Yes'}
                onChange={(event) =>
                  setWasItAccomplished(event.target.checked ? 'Yes' : 'No')
                }
              />
            </Grid>
          </Grid>
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
  const [wasItAccomplished, setWasItAccomplished] = useState('No');
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
      actionButtonTitle="Confirm"
      actionButtonColor="submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Goal"
      modalMessage="Fill out the fields below to add a goal."
      onActionButtonClick={requestSubmit}
      openButtonIcon={<AddIcon />}
    >
      <Grid container alignItems="center" px={4} py={2} spacing={1}>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Goal Title"
            onChange={(value) => setGoalSet(value)}
            value={goalSet}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                margin="normal"
                label="Date Goal Set"
                value={dayjs(dateGoalSet)}
                onChange={(newValue) => setDateGoalSet(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                margin="normal"
                label="Goal Review Date"
                value={dayjs(goalReviewDate)}
                onChange={(newValue) => setGoalReviewDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Explanation"
            onChange={(value) => setExplanation(value)}
            value={explanation}
            minRows={3}
          />
        </Grid>

        <Grid
          item
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="SEL"
              onChange={(value) => setSel(value)}
              value={sel}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>Completed</Typography>
              <Checkbox
                checked={wasItAccomplished === 'Yes'}
                onChange={(event) =>
                  setWasItAccomplished(event.target.checked ? 'Yes' : 'No')
                }
              />
            </Grid>
          </Grid>
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
      modalMessage="Are you sure you want to delete this goal?"
      cancelButtonTitle="Cancel"
      actionButtonTitle="Delete"
      actionButtonColor="archive"
      onActionButtonClick={requestDelete}
      openButtonIcon={<DeleteIcon />}
    />
  );
}

DeleteGoalModal.propTypes = {
  goal: propTypes.object,
  onSaveSuccess: undefined,
};
DeleteGoalModal.defaultProps = {
  goal: [],
  onSaveSuccess: undefined,
};
AddGoalModal.propTypes = {
  student: propTypes.object,
  onSaveSuccess: propTypes.func,
};
AddGoalModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};
EditGoalModal.propTypes = {
  goal: propTypes.object,
  onSaveSuccess: propTypes.func,
};
EditGoalModal.defaultProps = {
  goal: undefined,
  onSaveSuccess: undefined,
};
