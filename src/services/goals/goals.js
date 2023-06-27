import { callApi } from '../../utils/call-api/call-api';

export const getGoals = () => callApi({ url: '/Goals' });

/**
 *
 * @param {{id:UUID, studentId: UUID, goalSet: string, dateGoalSet: Date, sel: string, goalReviewDate: Date, wasItAccomplished: string, explanation: string}} goal
 */
export const addGoal = (goal) =>
  callApi({ url: '/Goals', data: goal, method: 'POST' });

/**
 *
 * @param {{id:UUID, studentId: UUID, goalSet: string, dateGoalSet: Date, sel: string, goalReviewDate: Date, wasItAccomplished: string, explanation: string}} goal
 */
export const editGoal = (goal) =>
  callApi({ url: '/Goals', data: goal, method: 'PUT' });

export const deleteGoal = (goalId) =>
  callApi({ url: `/Goals/${goalId}`, method: 'DELETE' });

export const getStudentGoals = (studentId) =>
  callApi({ url: `/goals/student-goals/${studentId}` });
