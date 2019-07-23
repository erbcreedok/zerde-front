import Vue from 'vue';
import moment from 'moment';
import {DEFAULT_TITLE} from '../_types'
import {capitalize} from '../_filters/capitalize'

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


export function setDocumentTitle(title='', translate=true, useDefaultTitle = true) {
  document.title = (translate ? capitalize(Vue.prototype.$t(title)) : title) + (useDefaultTitle ? (title.length ? ' | ' : '') + DEFAULT_TITLE : '');
}