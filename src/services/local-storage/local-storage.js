export const getLocalStorageItem = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

export const setLocalStorageItem = (key, value) => {
  const formattedValue = JSON.stringify(value);
  localStorage.setItem(key, formattedValue);
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
