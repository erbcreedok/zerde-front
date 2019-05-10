import AuthMock from '../_mock/authorization.mock'
import {BAD_CREDENTIALS, NO_DATA} from '../_types'

const authService = {
  async login(username, password) {
    return await AuthMock.login(username, password)
      .catch(handleError)
      .then(handleSuccess)
      .then(user => {
        if (user) {
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  },
  async register(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ( data.password.length >= 6) {
          resolve({status: 200, data: {token: 'SOME_TOKEN_ASD'}})
        } else {
          reject({status: 400, data: {message: 'Validation error'}})
        }
      }, 300)
    })
  }
};

function handleError({status, message}) {
  const errors = {};
  if(status === 400 && message === BAD_CREDENTIALS)
    errors.badCredentials = {status, message};
  return Promise.reject(errors)
}

function handleSuccess(res) {
  if (res.data) return res.data;
  return Promise.reject({data: NO_DATA})
}

export default authService