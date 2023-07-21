import {
  requestPasswordReset,
  resetPassword,
} from '../../services/users/users';

export async function requestPasswordResetHandler(email) {
  const data = { email };
  await requestPasswordReset(data);
}
export async function resetPasswordHandler(
  email,
  password,
  confirmPassword,
  token
) {
  const data = { email, password, confirmPassword, token };
  await resetPassword(data);
}
