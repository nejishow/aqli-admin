import UserService from "../services/userService.js";
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
  login({ commit }, payload) {
    return UserService.loginUser(payload.email, payload.password).then(
      async response => {
        await localStorage.setItem("token", response.data.token);
        await localStorage.setItem("id", response.data.user._id);
        await commit("SET_USER", response.data.user);
        await commit("SET_ID", response.data.user._id);
        await commit("SET_TOKEN", response.data.token);
      }
    );
  },
  logout({ commit }) {
    return UserService.logoutUser().then(async () => {
      await commit("LOGOUT");
    });
  },
  getUser({ commit }) {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined
    ) {
      return UserService.getAdmin()
        .then(async response => {
          await commit("SET_USER", response.data);
          await commit("SET_ID", localStorage.getItem("id"));
          await commit("SET_TOKEN", localStorage.getItem("token"));
        })
        .catch(error => {
          if (error.response.status === 401) {
            return UserService.logoutUser()
              .then(async () => {
                await commit("LOGOUT");
              })
              .catch(async () => {
                await commit("LOGOUT");
              });
          }
        });
    }
  }
};

export default {
  actions,
  mutations,
  getters,
  state
};
