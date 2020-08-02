<template>
  <div>
    <Post :post="post" :unique="true"></Post>
    <div v-for="comment in post.comments" i v-bind:key="comment.id">
      <Comment :comment="comment"></Comment>
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
    ...mapActions(["fetchPosts"])
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
