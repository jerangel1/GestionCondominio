
// Implementation of function range of python in typescript
export const range = (start: number, end: number, step = 1): number[] => {
  const length = Math.floor((end - start) / step);
  return Array.from({ length }, (_, i) => start + i * step);
};
