export const getRandomNumberId = (numericCount: number): number => {
  const min = 10 ** (numericCount - 1);
  const max = min * 10 - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
