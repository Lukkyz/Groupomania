const post_uri = "http://localhost:3000/post/";
import axios from "axios";

const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const actions = {
  async fetchPosts({ commit }) {
    let response = await axios.get(post_uri);
    commit("setPosts", response.data);
  },

  async addPost({ commit }, post) {
    let response = await axios.post(post_uri, post);
    commit("newPost", response.data);
  },

  async deletePost({ commit }, id) {
    await axios.delete(post_uri + id);
    commit("removePost", id);
  },

  async updatePost({ commit }, post) {
    let response = await axios.put(post_uri + post.id, post);
    commit("updatePost", response.data);
  },
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  newPost: (state, post) => state.posts.unshift(post),
  removePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),
  updateTodo: (state, updPost) => {
    const index = state.posts.findIndex((post) => post.id === updPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updPost);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
