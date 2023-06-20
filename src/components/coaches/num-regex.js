export function NumRegex(text) {
  const num = /\d/;

  if (num.test(text)) {
    return true;
  }
  return false;
}
