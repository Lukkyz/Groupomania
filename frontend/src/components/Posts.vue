<template>
  <div class="Posts">
    <addPost />
    <div v-for="post in allPosts" :key="post.id">
      <Post :post="post" :unique="false"></Post>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addPost from "./addPost";
import Post from "./Post";
export default {
  name: "Posts",
  components: {
    addPost,
    Post
  },
  methods: {
    ...mapActions(["fetchPosts", "deletePost", "updatePost"])
  },
  computed: mapGetters(["allPosts"]),
  created() {
    this.fetchPosts();
  }
};
</script>

<style>
</style>
