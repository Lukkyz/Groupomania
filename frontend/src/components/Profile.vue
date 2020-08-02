<template>
  <div>
    <div class="col-sm-6 offset-3 mt-5">
      <h3>{{ profile.firstName }}</h3>
      <h3>{{ profile.lastName }}</h3>
    </div>
    <h3 class="col-sm-4 offset-3 mt-5">Posts</h3>
    <div v-for="post in posts" v-bind:key="post.id">
      <Post :post="post" />
    </div>
    <h3 class="col-sm-4 offset-3 mt-5">Commentaires</h3>
    <div v-for="comment in comments" v-bind:key="comment">
      <Comment :comment="comment" />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import Comment from "../components/Comment";
import axios from "axios";
export default {
  components: {
    Post,
    Comment
  },
  props: ["userid"],
  data() {
    return {
      id: this.userid,
      posts: {},
      comments: {},
      profile: {}
    };
  },
  methods: {
    async getProfile() {
      let response = await axios.get(`http://localhost:3000/user/${this.id}`);
      this.profile = response.data;
    },
    async getPosts() {
      let response = await axios.get(
        `http://localhost:3000/post/user/${this.id}`
      );
      this.posts = response.data;
    },
    async getComments() {
      let response = await axios.get(
        `http://localhost:3000/comment/user/${this.id}`
      );
      this.comments = response.data;
    }
  },
  created() {
    this.getProfile();
    this.getPosts();
    this.getComments();
  }
};
</script>
