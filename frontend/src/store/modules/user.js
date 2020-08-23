const user_uri = "http://localhost:3000/user/";
import router from "../../router/index";
import axios from "axios";
const state = {
  user: {},
  error: "",
  loading: false,
};

const getters = {
  user: (state) => state.user,
  error: (state) => state.error,
  loading: (state) => state.loading,
  fullName: (state) => state.user.firstName + " " + state.user.lastName,
};

const actions = {
  async refresh({ commit }) {
    let response = await axios.post(user_uri + "refresh_token");
    commit("setUser", response.data);
  },

  async signIn({ commit }, credentials) {
    await axios.post(user_uri + "signup", credentials);
    commit("setError");
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
  async deleteUser({ commit }, id) {
    await axios.delete(user_uri + id);
    commit("setUser", "");
    router.push("/login");
  },
  async load({ commit }) {
    commit("setLoading");
  },
};

const mutations = {
  setError: (state, error) => (state.error = error),
  setUser: (state, user) => (state.user = user),
  setLoading: (state) => (state.loading = true),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
