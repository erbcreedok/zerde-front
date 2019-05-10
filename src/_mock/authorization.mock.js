import {getListFromLocalStorage} from '../_helpers/getFromLocalStorage'
import {BAD_CREDENTIALS} from '../_types'

const defUsers = [
  {
    email: 'erbol@gmail.com',
    phone: '77021113438',
    first_name: 'Yerbol',
    last_name: 'Syzdyk',
    password: '123123',
    roleID: 0,
  },
  {
    email: 'admin@academy.kz',
    phone: '77777777777',
    first_name: 'Admin',
    last_name: '',
    password: 'admin',
    roleID: 2,
  }
];

const localStorageNaming = 'Academy-Users';

const AuthMock = {
  getUsers() {
    return getListFromLocalStorage(localStorageNaming, defUsers);
  },
  getUser(username) {
    return this.getUsers().find(u => (u.phone === username || u.email === username));
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getUser(username);
        if (user && user.password === password) {
          resolve({status: 200, data: user});
        }
        reject({status: 400, message: BAD_CREDENTIALS});
      }, 1000)
    });
  }
};

export default AuthMock;