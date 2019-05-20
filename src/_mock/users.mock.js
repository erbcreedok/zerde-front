import {getListFromLocalStorage, setListToLocalStorage} from '../_helpers/getFromLocalStorage'
import {generateRandomInt} from '../_helpers'

const defUsers = [
  {
    id: 1,
    email: 'john@doe.com',
    phone: '77011232323',
    first_name: 'John',
    last_name: 'Doe',
    password: '123123',
    roleID: 0,
    tokens: [],
    avatar_src: 'https://thispersondoesnotexist.com/image',
  },
  {
    id: 2,
    email: 'admin@academy.kz',
    phone: '77777777777',
    first_name: 'Admin',
    last_name: '',
    password: 'admin',
    roleID: 2,
    tokens: [],
    avatar_src: 'https://thispersondoesnotexist.com/image',
  },
  {
    id: 3,
    email: 'vasya@pupkin.kz',
    phone: '77071232323',
    first_name: 'Василий',
    last_name: 'Пупкин',
    password: 'password',
    roleID: 1,
    tokens: [],
    avatar_src: 'https://thispersondoesnotexist.com/image',
  },
  {
    id: 4,
    email: 'olzhas@zharkyn.kz',
    phone: '77021113438',
    first_name: 'Олжас',
    last_name: 'Жаркын',
    password: 'password',
    roleID: 1,
    tokens: [],
    avatar_src: 'https://thispersondoesnotexist.com/image',
  }
];

const tokenExpiring = 1000 * 60 * 60; // 1 hour

const localStorageNaming = 'Academy-Users';

const usersMock = {
  resetUsers() {
    setListToLocalStorage(localStorageNaming, defUsers);
  },
  getUsers() {
    const users = getListFromLocalStorage(localStorageNaming, defUsers);
    return users.map(user => {
      user.full_name = user.first_name + ' ' + user.last_name;
      return user;
    });
  },
  getRandomUser() {
    const users = this.getUsers();
    return users[generateRandomInt(users.length)];
  },
  getUser(username) {
    return this.getUsers().find(u => (u.phone === username || u.email === username));
  },
  getUserIndex(username) {
    return this.getUsers().findIndex(u => (u.phone === username || u.email === username));
  },
  getUserByToken(token) {
    return this.getUsers().find(u => u.tokens && u.tokens.find(t => t.token === token));
  },
  getUserById(id) {
    return this.getUsers().find(u => u.id === id);
  },
  createUser(user) {
    const users = this.getUsers();
    user.roleID = 0;
    user.id = 'id' + (new Date()).getTime();
    if (users.find(u => u.phone === user.phone)) {
      throw {code: 400, message: 'this phone is already in use'};
    }
    if (users.find(u => u.email === user.email)) {
      throw {code: 400, message: 'this email is already in use'};
    }
    users.push(user);
    console.log(users);
    setListToLocalStorage(localStorageNaming, users);
    return user;
  },
  setUsers(users) {
    setListToLocalStorage(localStorageNaming, users);
  },
  setUser(user) {
    const index = this.getUserIndex(user.phone);
    if (index === -1) {
      return undefined;
    } else {
      const users = this.getUsers();
      users[index] = user;
      this.setUsers(users);
      return user;
    }
  },
  saveToken(user, token) {
    const u = this.getUser(user.phone);
    if (u) {
      if (!u.tokens) u.tokens = [];
      u.tokens.push({token: token, createdAt: (new Date()).getTime()});
      this.setUser(u);
    }
  },
  fetchMyUser(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getUserByToken(token);
        if (user) {
          const tokenData = user.tokens.find(t => t.token === token);
          if ((new Date()).getTime() - (new Date(tokenData.createdAt)).getTime() > tokenExpiring) {
            reject({status: 403, message: 'User token has expired'});
          }
          resolve(user);
        } else {
          reject({status: 404, message: 'there is no user with this token'});
        }
      }, 1000);
    });
  },
  fetchUser(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getUser(username);
        if (user) {
          resolve(user);
        } else {
          reject({status: 404, message: 'there is no user with this username'});
        }
      }, 1000);
    });
  },
}

window.mockAcademyUsers = {
  resetUsers: usersMock.resetUsers,
}

export default usersMock;