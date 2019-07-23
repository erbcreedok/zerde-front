import axios from 'axios';
import Vue from 'vue'
import {capitalize} from '../_filters/capitalize'
import i18nService from '../_services/i18n.service'

export const homeURL = 'http://academy-back.tk';

const baseURLS = {
  'development': homeURL + '/api',
  'production': homeURL + '/api',
};
const client =  axios.create({
  baseURL: baseURLS[process.env.NODE_ENV] || 'http://academy-back.tk/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Localization': i18nService.getCurrentLocale(),
  }
});

client.interceptors.response.use(res => res, error => {
  if (error.response.status === 500) {
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('server not responding')),
    });
  }
  throw error;
});

export const setTokenToClient = token => { client.defaults.headers.common.Authorization = 'Bearer ' + token };
export const removeTokenFromClient = () => { delete client.defaults.headers.common.Authorization };

export function handleResponse(res) {
  return res.data;
}

export function handleError(error) {
  if (error.response.status === 401) {
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('authorisation required'))
    })
  }
  throw error;
}

export default client;
