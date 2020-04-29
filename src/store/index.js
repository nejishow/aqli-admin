import Vue from "vue";
import Vuex from "vuex";
import user from "../store/user.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    picture: [],
    src: null
  },
  getters: {
    getPicture(state) {
      return state.picture;
    },
    getSrc(state) {
      return state.src;
    }
  },
  mutations: {
    setPicture(state, payload) {
      state.picture = payload;
    },
    setSrc(state, payload) {
      state.src = payload;
    }
  },
  actions: {
    setPicture({ commit }, payload) {
      commit("setPicture", payload);
    },
    setSrc({ commit }, payload) {
      commit("setSrc", payload);
    }
  },
  modules: {
    user
  }
});
