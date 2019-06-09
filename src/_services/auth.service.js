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
        this.setAuthorization(phone, password, token);
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
    data.firstname = data.name;
    data.lastname = data.surname;
    delete data.name;
    delete data.surname;
    console.log({data});
    return await authApi.register(data)
      .catch(handleError)
      .then(handleSuccess)
      .then(user => {
        console.log(user);
        return user;
      })
  },
  async confirmSMS(phone, code) {
    return await authApi.confirmSMS(phone, code);
  },
  async resendSMS(phone) {
    return await authApi.resendSMS(phone);
  },
  async forgotPassword(phone) {
    console.log({phone});
    return await authApi.forgotPassword(phone)
      .catch(handleError)
      .then(handleSuccess);
  },
  async verifyForgotPassword(phone, code) {
    console.log({phone, code});
    return await authApi.verifyForgotPassword(phone, code)
      .catch(handleError)
      .then(handleSuccess);
  },
  async resetPassword(phone, code, password, c_password) {
    console.log({phone, code, password, c_password});
    return await authApi.resetPassword(phone, code, password, c_password)
      .catch(handleError)
      .then(handleSuccess);
  },
  setAuthorization(phone, password, token) {
    const authdata = window.btoa(phone + ':' + password);
    localStorage.setItem(LS_USERS, JSON.stringify(authdata));
    localStorage.setItem(LS_TOKEN, token);
    setTokenToClient(token);
    // userService.setUserToStore(user);
    store.commit(AUTH + RESET);
    console.log(token);
  }
};

function handleError({message, response}) {
  const {status, data} = response;
  console.log({status, message, response});
  const errors = [];
  if(status === 400 && message === BAD_CREDENTIALS) {
    errors.push({status, message: 'wrong username or password'});
  }
  else if (status === 422) {
    console.log(Object.keys(data.data));
    Object.keys(data.data.errors).forEach(field => {
      data.data.errors[field].map((err, index) => {
        errors.push({status: field+''+index, message: err});
      });
    });
  }
  else {
    errors.push({status, message});
  }
  console.log(errors);
  throw errors
}

function handleSuccess(res) {
  if (res.data) return res.data;
  throw {data: NO_DATA}
}

export default authService
