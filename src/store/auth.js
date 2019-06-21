import {RESET, SET} from '../_types/store-types'
import {LS_TOKEN, LS_USERS} from '../_types'

const state = {
  authorized: !!localStorage.getItem(LS_USERS),
  token: localStorage.getItem(LS_TOKEN),
};

const mutations = {
  [SET](state, {authorised=false, token=null}) {
    state.authorized = authorised;
    state.token = token;
  },
  [RESET](state) {
    state.authorized = !!localStorage.getItem(LS_USERS);
    state.token = localStorage.getItem(LS_TOKEN);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
}
