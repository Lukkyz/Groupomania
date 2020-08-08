<template>
  <div>
    <Post :post="post" :unique="true"></Post>
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <Comment @deleted="deleteComment" :comment="comment"></Comment>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Post from "../components/Post";
import Comment from "../components/Comment";
export default {
  components: {
    Post,
    Comment
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    deleteComment(event) {
      console.log(this.post);
      this.post.comments = this.post.comments.filter(
        comment => comment.id !== event
      );
    }
  },
  computed: {
    ...mapGetters(["getPost"]),
    post() {
      return this.getPost(this.$route.params.id);
    }
  }
};
</script>

<style>
</style>
