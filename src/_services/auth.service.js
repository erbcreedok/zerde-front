import AuthMock from '../_mock/authorization.mock'
import {BAD_CREDENTIALS, LS_USERS, NO_DATA} from '../_types'
import store from '../store/index'
import {AUTH, RESET_AUTH} from '../_types/store-types'

const authService = {
  isLogged() {
    const user = localStorage.getItem(LS_USERS);
    if (user) {
      return JSON.parse(user);
    } else {
      return false;
    }
  },
  async login(username, password) {
    return await AuthMock.login(username, password)
      .catch(handleError)
      .then(handleSuccess)
      .then(user => {
        if (user) {
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem(LS_USERS, JSON.stringify(user));
          store.commit(AUTH + RESET_AUTH);
        }
        return user;
      });
  },
  async logout() {
    return await AuthMock.logout().then(() => {
      localStorage.removeItem(LS_USERS);
      store.commit(AUTH + RESET_AUTH);
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
  const errors = [];
  if(status === 400 && message === BAD_CREDENTIALS)
    errors.push({status, message: 'Неверный логин или пароль'});
  return Promise.reject(errors)
}

function handleSuccess(res) {
  if (res.data) return res.data;
  return Promise.reject({data: NO_DATA})
}

export default authService