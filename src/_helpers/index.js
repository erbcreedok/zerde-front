export const generateRandom = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.random() * (max-min) + min;
}

export const generateRandomInt = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max-min) + min);
}