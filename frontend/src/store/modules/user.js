const user_uri = "http://localhost:3000/user/";
import router from "../../router/index";
import axios from "axios";

const state = {
  user: {},
  error: "",
};

const getters = {
  user: (state) => state.user,
  error: (state) => state.error,
};

const actions = {
  async refresh({ commit }) {
    let response = await axios.post(user_uri + "refresh_token");
    commit("setUser", response.data);
  },

  async signIn(user) {
    let response = await axios.post(user_uri + "signup", user);
    console.log(response);
  },

  async logIn({ commit }, credentials) {
    try {
      let response = await axios.post(user_uri + "login", credentials);
      commit("setUser", response.data);
      commit("setError");
      router.push("/");
    } catch (e) {
      commit("setError", e.response.data.error);
    }
  },
  async logOut({ commit }) {
    await axios.post(user_uri + "logout");
    commit("setUser", "");
    router.push("/login");
  },
};

const mutations = {
  setError: (state, error) => (state.error = error),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
