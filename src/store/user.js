import {CLEAR, SET} from '../_types/store-types'

const state = {
  user: {}
};

const getters = {
  getUserName(state) {
    return state.user.first_name;
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
