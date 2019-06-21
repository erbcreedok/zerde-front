import axios from 'axios';
import Vue from 'vue'
import {capitalize} from '../_filters/capitalize'

export const homeURL = 'http://academy-back.tk';

const baseURLS = {
  'development': homeURL + '/api',
  'production': homeURL + '/api',
};
const client =  axios.create({
  baseURL: baseURLS[process.env.NODE_ENV] || 'http://academy-back.tk/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

client.interceptors.response.use(res => res, error => {
  if (error.response.status === 500) {
    console.log();
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('server not responding')),
    });
  }
  throw error;
});

export const setTokenToClient = token => { client.defaults.headers.common.Authorization = 'Bearer ' + token };
export const removeTokenFromClient = () => { delete client.defaults.headers.common.Authorization };

export function handleResponse(res) {
  console.log(res);
  return res.data;
}

export default client;
