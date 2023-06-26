import { addGoal } from '../../services/goals/goals';

export function addGoalHandler(
  id,
  studentId,
  goalSet,
  dateGoalSet,
  sel,
  goalReviewDate,
  wasItAccomplished,
  explanation
) {
  const data = {
    id,
    studentId,
    goalSet,
    dateGoalSet,
    sel,
    goalReviewDate,
    wasItAccomplished,
    explanation,
  };
  addGoal(data);
}
