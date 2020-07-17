<template>
  <div class="Posts">
    <addPost />
    <div v-for="post in allPosts" :key="post.id">
      <v-card class="mx-auto mb-4" color="white" max-width="800">
        <v-card-title>
          <span class="title font-weight-bold">{{ post.title }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">{{ post.body }}</v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ post.user.firstName + " " + post.user.lastName}}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2"></span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">mdi-message-text</v-icon>
              <span class="subheading">{{ post.comments ? post.comments.length : 0 }}</span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addPost from "./addPost";

export default {
  name: "Posts",
  components: {
    addPost
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
