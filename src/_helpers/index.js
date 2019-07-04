import moment from 'moment';

export const generateRandom = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.random() * (max-min) + min;
};

export const generateRandomInt = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max-min) + min);
};

export const handlePhoneFocus = (e) => {
  console.log(e);
};

export function getTimeString(seconds) {
  return moment(seconds * 1000).format('m:ss');
}
