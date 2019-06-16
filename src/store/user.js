import {CLEAR, SET} from '../_types/store-types'

const state = {
  user: {}
};

const getters = {
  getUserName(state) {
    return state.user.firstname;
  },
  getUserId(state) {
    return state.user.id;
  },
  getUserAvatarSrc(state) {
    return state.user.avatar_src;
  }
};

const mutations = {
  [SET](state, user) {
    state.user = user;
  },
  [CLEAR](state) {
    state.user = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
