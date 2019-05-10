import {RESET_AUTH, SET_AUTH} from '../_types/store-types'
import {LS_USERS} from '../_types'

const state = {
  authorized: !!localStorage.getItem(LS_USERS)
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.authorized = payload;
  },
  [RESET_AUTH](state) {
    state.authorized = !!localStorage.getItem(LS_USERS);
  }
}

export default {
  namespaced: true,
  state,
  mutations
}