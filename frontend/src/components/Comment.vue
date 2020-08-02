<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="800">
      <v-card-text class="body-1" color="white">{{ comment.body }}</v-card-text>

      <v-card-actions>
        <span class="subtitle-2 ml-2">{{ comment.user.firstName + " " + comment.user.lastName}}</span>
        <v-row align="center" justify="end"></v-row>
      </v-card-actions>
      <div v-if="comment.userId == user.userId">
        <v-icon class="red lighten-1 rounded my-1 mx-3">mdi-close-box-outline</v-icon>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    comment: Object
  },
  computed: mapGetters(["user"])
};
</script>

<style>
</style>
