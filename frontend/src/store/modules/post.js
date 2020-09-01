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
  isLiked: (state) => (id) => {
    let index = state.postLiked.findIndex(post => {
      return post.postId == id
    })
    if (index > -1) {
      return true
    } else {
      return false
    }
  },
  isDisliked: (state) => (id) => {
    let index = state.postDisliked.findIndex(post => {
      return post.postId == id
    })
    if (index > -1) {
      return true
    } else {
      return false
    }  }
};

const actions = {
  async fetchPosts({ commit, dispatch }) {
    let response = await axios.get(post_uri);
    dispatch("getLikedDisliked")
    commit("setPosts", response.data);
  },

  async getLikedDisliked({ commit, rootGetters}) {
    let userId = rootGetters.user.userId;
    let liked = await axios.get(post_uri + "liked/" + userId);
    let disliked = await axios.get(post_uri + "disliked/" + userId);
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

  async clearLikeDislike({ commit }) {
    commit("setLiked", {})
    commit("setDisliked", {})
  },

  async addLikeDislike({ commit, getters, dispatch, rootGetters}, obj) {
    const { id, like } = obj;
    await axios
      .post(post_uri + obj.id + "/like", {
        userId: rootGetters.user.userId,
        like,
      })
      .then(() => {
        if (like == 1) {
          commit("addLike", id);
          commit("changeScore", {idPost: id, i:1});
        } else if (like == -1) {
          commit("addDisliked", id);
          commit("changeScore", {idPost: id, i:-1});
        } else if (like == 0) {
          if (getters.isLiked(id)) {
            commit("removeLiked", id)
            commit("changeScore", {idPost: id, i: -1})
          } else if (getters.isDisliked(id)) {
            commit('removeDisliked', id);
            commit('changeScore', {idPost: id, i: 1})
          }
        }
      });
      dispatch("getLikedDisliked")
  },
};

const mutations = {
  changeScore: (state, {idPost, i}) => {
    let index = state.posts.findIndex((post) => {
      return post.id == idPost;
    });
    state.posts[index].score += i;
  },
  removeLiked: (state, id) => state.postLiked = state.postLiked.filter(post => post.postId !== id),
  removeDisliked: (state, id) => state.postLiked = state.postDisliked.filter(post => post.postId !== id),
  addLike: (state, id) => state.postLiked.unshift(id),
  addDisliked: (state, id) => state.postDisliked.unshift(id),
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
