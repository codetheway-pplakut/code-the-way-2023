export function SpecRegex(text) {
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

  if (specialChars.test(text)) {
    return true;
  }
  return false;
}
