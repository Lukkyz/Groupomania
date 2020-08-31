import axios from "axios";

const post_uri = "http://localhost:3000/post/";
const comment_uri = "http://localhost:3000/comment/";

const state = {
  posts: [],
  postLiked: [],
  postDisliked: [],
};

const getters = {
  allPosts: (state) => state.posts,
  getPost: (state) => (id) => {
    return state.posts.find((post) => post.id == id);
  },
  getPostUser: (state) => (userId) => {
    let postUser = state.posts.filter((post) => post.userId == userId);
    return postUser;
  },
};

const actions = {
  async fetchPosts({ commit, rootGetters }) {
    let response = await axios.get(post_uri);
    let userId = rootGetters.user.userId;
    let liked = await axios.get(post_uri + "/liked/" + userId);
    let disliked = await axios.get(post_uri + "/disliked/" + userId);
    commit("setPosts", response.data);
    commit("setLiked", liked.data);
    commit("setDisliked", disliked.data);
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

  // Comment
  async addComment({ commit }, comment) {
    let response = await axios.post(comment_uri, comment);
    commit("newComment", response.data);
  },
};

const mutations = {
  setLiked: (state, posts) => (state.likedPosts = posts),
  setDisliked: (state, posts) => (state.dislikedPosts = posts),
  setPosts: (state, posts) => (state.posts = posts),
  newPost: (state, post) => state.posts.unshift(post),
  removePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),
  newComment: (state, comment) => {
    let post = state.posts.find((post) => post.id === comment.postId);
    post.comments.unshift(comment);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
