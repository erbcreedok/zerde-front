import usersMock from '../_mock/users.mock'
import store from '../store'
import client from '../_api'
import {CLEAR, SET, USER} from '../_types/store-types'
import userApi from '../_api/user.api'
import {normalizeUser, normalizeUserProfile} from './normalizers'

const userService = {
  loadedUsers: [],
  getMyUser() {
    return userApi.getMyUser().then(({user}) => {
      user = normalizeUser(user);
      this.setUserToStore(user);
      return user;
    });
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
      return normalizeUser(user);
    });
  },
  getMyProfile() {
    return userApi.getMyProfile().then(({user}) => {
      return normalizeUserProfile(user)
    });
  },
  getUserProfile(id) {
    return userApi.getUserProfile(id).then(({user}) => {
      return normalizeUserProfile(user);
    });
  },
  getUserAchievements(userID) {
    return client.get(`user/achievements/${userID}`).then(({data}) => {
      console.log(data.data.achievements);
    });
  },
  updateProfile(data) {
    return userApi.updateProfile(data).then(({message}) => {
      return message;
    })
  },
  approveSpecialization(user_id, specialization_id, val) {
    return userApi.approveSpecialization(user_id, specialization_id, val).then(({message}) => message);
  }
};


window.userService = userService;

export default userService;
