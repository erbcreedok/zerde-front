import AuthMock from '../_mock/authorization.mock'
import {BAD_CREDENTIALS, LS_TOKEN, LS_USERS, NO_DATA} from '../_types'
import store from '../store/index'
import {AUTH, RESET} from '../_types/store-types'
import userService from './user.service'
import authApi from "../_api/auth.api";
import {removeTokenFromClient, setTokenToClient} from "../_api";

const authService = {
  isLogged() {
    const user = localStorage.getItem(LS_USERS);
    if (user) {
      return JSON.parse(user);
    } else {
      return false;
    }
  },
  getToken() {
    return localStorage.getItem(LS_TOKEN);
  },
  async login(phone, password) {
    return await authApi.login(phone, password)
      .catch(handleError)
      .then(handleSuccess)
      .then(({token}) => {
          const authdata = window.btoa(phone + ':' + password);
          localStorage.setItem(LS_USERS, JSON.stringify(authdata));
          localStorage.setItem(LS_TOKEN, token);
          setTokenToClient(token);
          // userService.setUserToStore(user);
          store.commit(AUTH + RESET);
          console.log(token);
      });
  },
  async logout() {
    return await AuthMock.logout().then(() => {
      removeTokenFromClient();
      localStorage.removeItem(LS_USERS);
      localStorage.removeItem(LS_TOKEN);
      userService.removeUserFromStore();
      store.commit(AUTH + RESET);
      window.location.reload();
    });
  },
  async register(data) {
    data.first_name = data.name;
    data.last_name = data.surname;
    delete data.name;
    delete data.surname;
    console.log({data});
    return await AuthMock.register(data)
      .catch(handleError)
      .then(handleSuccess)
      .then(user => {
        return user;
      })
  },
  async confirmSMS(phone, code) {
    return await AuthMock.confirmSMS(phone, code);
  },
  async resendSMS(phone) {
    return await AuthMock.resendSMS(phone);
  }
};

function handleError({status, message}) {
  console.log({status, message});
  const errors = [];
  if(status === 400 && message === BAD_CREDENTIALS) {
    errors.push({status, message: 'wrong username or password'});
  } else {
    errors.push({status, message});
  }
  return Promise.reject(errors)
}

function handleSuccess(res) {
  if (res.data) return res.data;
  return Promise.reject({data: NO_DATA})
}

export default authService
