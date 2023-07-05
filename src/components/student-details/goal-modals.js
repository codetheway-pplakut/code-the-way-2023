import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editGoalHandler } from './goalsHandler';

export function editGoalModal(props) {
  const { goal, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(Date);
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(Date);
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    setGoalSet(goal.goalSet);
    setDateGoalSet(goal.dateGoalSet);
    setSEL(goal.sel);
    setGoalReviewDate(goal.goalReviewDate);
    setWasItAccomplished(goal.wasItAccomplished);
    setExplanation(goal.explanation);
  }, [goal]);

  const requestSave = async () => {
    const updatedGoal = {
      ...goal,
      goalSet,
      dateGoalSet,
      SEL,
      goalReviewDate,
      wasItAccomplished,
      explanation,
    };
    await editGoalHandler(updatedGoal);

    // if (onSaveSuccess) onSaveSuccess;
  };
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Edit Goal"
      onActionButtonClick={requestSave}
      openButtonIcon={<EditIcon />}
    >
      <TextFieldWithErrorMessage
        label="Goal"
        onChange={(value) => setGoalSet(value)}
        value={goalSet}
      />

      <TextFieldWithErrorMessage
        label="SEL"
        onChange={(value) => setSEL(value)}
        value={SEL}
      />
      <TextFieldWithErrorMessage
        label="Accomplished?"
        onChange={(value) => setWasItAccomplished(value)}
        value={wasItAccomplished}
      />

      <TextFieldWithErrorMessage
        label="Explanation"
        onChange={(value) => setExplanation(value)}
        value={explanation}
      />
    </GenericModal>
  );
}
