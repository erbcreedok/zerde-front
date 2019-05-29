import axios from 'axios';

const baseURLS = {
  'development': 'http://academy-back.tk/api',
  'production': 'http://academy-back.tk/api',
};
const client =  axios.create({
  baseURL: baseURLS[process.env.NODE_ENV] || 'http://academy-back.tk/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setTokenToClient = token => { client.defaults.headers.common.Authorization = 'Bearer ' + token };
export const removeTokenFromClient = () => { delete client.defaults.headers.common.Authorization };

export default client;
