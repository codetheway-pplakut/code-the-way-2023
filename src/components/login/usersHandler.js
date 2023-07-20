import {
  requestPasswordReset,
  resetPassword,
} from '../../services/users/users';

export function requestPasswordResetHandler(email) {
  const data = { email };
  return requestPasswordReset(data);
}
export function resetPasswordHandler(email, password, confirmPassword, token) {
  const data = { email, password, confirmPassword, token };
  return resetPassword(data);
}
