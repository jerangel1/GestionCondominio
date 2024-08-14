export const getStorageValue = (key: string, defaultValue: string | undefined = undefined) => {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : null;
  return initial || defaultValue;
};
