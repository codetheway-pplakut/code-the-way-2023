export function filterRowsByInput(input = '', rows = [], keys = []) {
  const lowerFilterInput = input.toLowerCase();

  return rows.filter((row) => {
    return keys.some((key) => {
      const value = row[key];
      const lowerValue = value.toLowerCase();

      return lowerValue.includes(lowerFilterInput);
    });
  });
}
