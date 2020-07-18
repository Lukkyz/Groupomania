<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="800">
      <v-card-text class="body-1" color="white">{{ comment.body }}</v-card-text>

      <v-card-actions>
        <span class="subtitle-2 ml-2">{{ comment.user.firstName + " " + comment.user.lastName}}</span>
        <v-row align="center" justify="end"></v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    comment: Object
  }
};
</script>
