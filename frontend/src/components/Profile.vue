<template>
  <div>
    <div class="col-sm-3 offset-3 mt-5">
      <h3>{{ profile.firstName }}</h3>
      <h3>{{ profile.lastName }}</h3>
    </div>
    <h3 class="col-sm-4 offset-3 mt-5">Posts</h3>
    <div v-for="post in allPosts" v-bind:key="post.id">
      <Post :post="post" />
    </div>
    <h3 class="col-sm-4 offset-3 mt-5">Commentaires</h3>
    <div v-for="comment in comments" v-bind:key="comment">
      <Comment @deleted="deleteComment" :comment="comment" />
    </div>
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
      id: this.userid,
      comments: {},
      profile: {},
      commentClick: ""
    };
  },
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts", "deletePost", "updatePost"]),
    async getProfile() {
      let response = await axios.get(`http://localhost:3000/user/${this.id}`);
      this.profile = response.data;
    },
    async getComments() {
      let response = await axios.get(
        `http://localhost:3000/comment/user/${this.id}`
      );
      this.comments = response.data;
    },
    deleteComment(event) {
      this.comments = this.comments.filter(comment => comment.id !== event);
    }
  },
  created() {
    this.fetchPosts();
    this.getProfile();
    this.getComments();
  }
};
</script>
