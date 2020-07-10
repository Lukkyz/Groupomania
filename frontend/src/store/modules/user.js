const user_uri = "http://localhost:3000/user/";
import axios from "axios";

const state = {
  user: {},
};

const getters = {
  user: (state) => state.user,
};

const actions = {
  async signIn(user) {
    let response = await axios.post(user_uri + "signup", user);
    console.log(response);
  },

  async logIn({ commit }, credentials) {
    let response = await axios.post(user_uri + "login", credentials);
    commit("setUser", response.data);
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
