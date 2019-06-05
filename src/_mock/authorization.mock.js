import {BAD_CREDENTIALS} from '../_types'
import usersMock from './users.mock'

const AuthMock = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = usersMock.getUser(username);
        if (user && user.password === password) {
          const token = `basic${(new Date().getTime()).toString()}-${user.phone}`;
          usersMock.saveToken(user, token);
          resolve({status: 200, data: {user, token}});
        }
        reject({status: 400, message: BAD_CREDENTIALS});
      }, 1000)
    });
  },
  register(data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if((!data.phone && !data.email)|| !data.password || !data.firstname || !data.lastname) {
          reject({status: 400, message: 'there are not enough fields'});
          return;
        }
        try {
          const user = usersMock.createUser(data);
          resolve({status: 200, data: user});
        } catch (e) {
          reject(e);
        }
      }, 1000);
    });
  },
  confirmSMS(phone, code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (phone && code==='1111') {
            resolve({status: 200, message: 'Phone confirmed'})
          } else {
            reject({status: 400, message: 'Code is invalid'});
          }
        }, 1000);
    });
  },
  resendSMS(phone) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (phone) {
          resolve({status: 200, message: 'SMS send'})
        } else {
          reject({status: 400, message: 'Phone is invalid'});
        }
      }, 300);
    });
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({status: 200, data: {}})
      })
    });
  },
};

export default AuthMock;
