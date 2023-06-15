export function NumRegex(text) {
  // eslint-disable-next-line no-useless-escape
  const num = /\d/;

  if (num.test(text)) {
    return true;
  }
  return false;
}
