import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import comments from "./comments";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    user,
    comments
  }
})
