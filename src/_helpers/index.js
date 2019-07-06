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
  if (seconds < 60 * 60) {
    return moment.utc(seconds * 1000).format('m:ss');
  } else {
    return moment.utc(seconds * 1000).format('H:mm:ss');
  }
}

window.moment = moment;
window.gettime = getTimeString;