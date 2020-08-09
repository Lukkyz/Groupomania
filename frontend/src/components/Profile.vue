<template>
  <div>
    <div class="col-sm-3 offset-3 mt-5">
      <h3>{{ profile.firstName }}</h3>
      <h3>{{ profile.lastName }}</h3>
    </div>
    <h3 class="col-sm-4 offset-3 mt-5">Posts</h3>
    <div v-for="post in posts" v-bind:key="post.id">
      <Post @deleted="deletePost" :post="post" />
    </div>
    <p class="col-sm-3 offset-3 mt-2" v-if="posts.length == 0">Vous n'avez pas de post</p>
    <h3 class="col-sm-4 offset-3 mt-5">Commentaires</h3>
    <div v-for="comment in comments" v-bind:key="comment">
      <Comment @deleted="deleteComment" :comment="comment" />
    </div>
    <p class="col-sm-3 offset-3 mt-2" v-if="comments.length == 0">Vous n'avez pas de commentaires</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      dialog: false,
      comments: [],
      profile: [],
      commentClick: ""
    };
  },
  computed: {
    ...mapGetters(["allPosts", "getPostUser"]),
    posts() {
      return this.getPostUser(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions(["fetchPosts", "deletePost", "updatePost"]),
    async getProfile() {
      let response = await axios.get(
        `http://localhost:3000/user/${this.$route.params.id}`
      );
      this.profile = response.data;
    },
    async getComments() {
      let response = await axios.get(
        `http://localhost:3000/comment/user/${this.$route.params.id}`
      );
      this.comments = response.data;
    },
    deleteComment(event) {
      this.comments = this.comments.filter(comment => comment.id !== event);
    },
    deletePost(event) {
      this.posts = this.comments.filter(post => post.id !== event);
    }
  },
  created() {
    this.fetchPosts();
    this.getProfile();
    this.getComments();
  }
};
</script>
