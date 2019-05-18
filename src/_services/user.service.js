import usersMock from '../_mock/users.mock'
import {LS_TOKEN} from '../_types'
import store from '../store'
import {CLEAR, SET, USER} from '../_types/store-types'

const userService = {
  getMyUser() {
    const token = localStorage.getItem(LS_TOKEN);
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