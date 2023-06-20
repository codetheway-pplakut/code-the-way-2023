export function EmailRegex(text) {
  // eslint-disable-next-line no-useless-escape
  const email = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (email.test(text)) {
    return true;
  }
  return false;
}
