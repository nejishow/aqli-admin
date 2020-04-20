export const state = () => ({
  id: null,
  token: null,
  user: []
});
export const getters = {
  getId(state) {
    return state.id;
  },
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  }
};
export const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT: state => {
    localStorage.clear();
    state.id = null;
    state.token = null;
    state.user = [];
  }
};
export const actions = {
};

export default {
  actions,
  mutations,
  getters,
  state
};
