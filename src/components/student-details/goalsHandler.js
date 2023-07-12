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

export async function getStudentGoalsHandler(studentId) {
  await getStudentGoals(studentId);
}
export function altGetStudentGoalsHandler(studentId, callback) {
  getStudentGoals(studentId)
    .then((goals) => {
      callback(goals, null); // Invoke the callback with goals and no error
    })
    .catch((error) => {
      callback(null, error); // Invoke the callback with null goals and the error
    });
}

export async function addGoalHandler(
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
  await addGoal(data);
}

export async function editGoalHandler(
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
  await editGoal(data);
}

export async function deleteGoalHandler(id) {
  await deleteGoal(id);
}
