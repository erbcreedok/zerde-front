import usersMock from '../_mock/users.mock'
import store from '../store'
import {CLEAR, SET, USER} from '../_types/store-types'
import authService from "./auth.service";

const userService = {
  getMyUser() {
    const token = authService.getToken();
    return usersMock.fetchMyUser(token).then(user => {
      this.setUserToStore(user);
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
  }
}

export default userService;
