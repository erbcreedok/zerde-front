import {SET} from "../_types/store-types";

const state = {
  activeCommentReply: null
};

const mutations = {
  [SET](state, payload=null) {
    state.activeCommentReply = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
}
