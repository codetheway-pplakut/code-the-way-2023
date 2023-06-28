import {
  addGoal,
  deleteGoal,
  editGoal,
  getGoals,
  getStudentGoals,
} from '../../services/goals/goals';

export function getGoalsHandler() {
  getGoals();
}

export function getStudentGoalsHandler(studentId) {
  getStudentGoals(studentId);
}

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

export function editGoalHandler(
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
  editGoal(data);
}

export function deleteGoalHandler(id) {
  deleteGoal(id);
}
