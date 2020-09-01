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
  postDisliked: (state) => state.postDisliked,
  postLiked: (state) => state.postLiked,
};

const actions = {
  async fetchPosts({ commit, rootGetters }) {
    let response = await axios.get(post_uri);
    let userId = rootGetters.user.userId;
    let liked = await axios.get(post_uri + "liked/" + userId);
    let disliked = await axios.get(post_uri + "disliked/" + userId);
    commit("setPosts", response.data);
    console.log(liked.data);
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

  async addLikeDislike({ commit, rootGetters }, obj) {
    const { id, like } = obj;
    await axios
      .post(post_uri + obj.id + "/like", {
        userId: rootGetters.user.userId,
        like,
      })
      .then(() => {
        if (like == 1) {
          commit("addLike", id);
          commit("changeScore", id, 1);
        } else if (like == -1) {
          commit("addDislike", id);
          commit("changeScore", id, -1);
        }
      });
  },
};

const mutations = {
  changeScore: (state, idPost, num) => {
    let index = state.posts.findIndex((post) => {
      post.id == idPost;
    });
    state.posts[index].score += num;
  },
  addLike: (state, id) => state.postLiked.unshift(id),
  addDisiiked: (state, id) => state.postLiked.unshift(id),
  setLiked: (state, posts) => (state.postLiked = posts),
  setDisliked: (state, posts) => (state.postDisliked = posts),
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
