<template>
  <div>
    <Post :post="post" :unique="true"></Post>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../components/Post";
export default {
  components: {
    Post
  },
  data() {
    return {};
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
