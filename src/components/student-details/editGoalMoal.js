import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GenericModal } from '../coaches/modal-component';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editGoal } from '../../services/goals/goals';

export default function EditGoalModal(props) {
  // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "goalSet": "string",
  // "dateGoalSet": "2023-06-29T14:41:28.332Z",
  // "sel": "string",
  // "goalReviewDate": "2023-06-29T14:41:28.332Z",
  // "wasItAccomplished": "string",
  // "explanation": "string"

  const { goals, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState('');
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState('');
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    setGoalSet(goals.goalSet);
    setDateGoalSet(goals.dateGoalSet);
    setSel(goals.sel);
    setGoalReviewDate(goals.goalReviewDate);
    setWasItAccomplished(goals.wasItAccomplished);
    setExplanation(goals.explanation);
    setHeader('Edit Goal');
  }, [goals]);

  const requestSave = async () => {
    const updateGoal = {
      ...goals,
      goalSet,
      dateGoalSet,
      sel,
      goalReviewDate,
      wasItAccomplished,
      explanation,
    };

    await editGoal(updateGoal);

    if (onSaveSuccess) onSaveSuccess();
  };

  if (goals == null) return;

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal="open"
    >
      <TextFieldWithErrorMessage
        label="Goal"
        onChange={(value) => setGoalSet(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="Date the Goal was Set"
        onChange={(value) => setDateGoalSet(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="SEL"
        onChange={(value) => setSel(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="Review Date"
        onChange={(value) => setGoalReviewDate(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="Was it Accomplished?"
        onChange={(value) => setWasItAccomplished(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="Explanation"
        onChange={(value) => setExplanation(value)}
        value={goalSet}
      />
    </GenericModal>
  );
}

EditGoalModal.propTypes = {
  goals: PropTypes.func,
  onSaveSuccess: PropTypes.func,
};

EditGoalModal.defaultProps = {
  goals: undefined,
  onSaveSuccess: undefined,
};
