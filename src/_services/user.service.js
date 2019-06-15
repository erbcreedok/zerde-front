import usersMock from '../_mock/users.mock'
import store from '../store'
import {CLEAR, SET, USER} from '../_types/store-types'
import userApi from "../_api/user.api";

const userService = {
  loadedUsers: [],
  getMyUser() {
    return userApi.getMyUser().then(({user}) => {
      console.log(user);
      this.setUserToStore(user);
      return user;
    });
  },
  getUserByToken(token) {
    console.log(token)
  },
  getUser(username) {
    usersMock.fetchUser(username).then(user => {
      return user;
    });
  },
  setUserToStore(user) {
    store.commit(USER + SET, user);
  },
  removeUserFromStore() {
    store.commit(USER + CLEAR);
  },
  getUserById(id, forced=false) {
    if (!forced) {
      const user = this.loadedUsers.find(u => u && u.id === id);
      if (user) return Promise.resolve(user);
    }
    return userApi.getUserById(id).then(({user}) => {
      this.loadedUsers.unshift(user);
      return user;
    });
  },
};

window.userService = userService;

export default userService;
