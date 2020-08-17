<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="800">
      <v-card-text class="body-1" color="white">{{ comment.body }}</v-card-text>

      <v-card-actions>
        <span class="subtitle-2 ml-2">{{ comment.user.firstName + " " + comment.user.lastName}}</span>
        <v-row align="center" justify="end"></v-row>
      </v-card-actions>
      <div v-if="comment.userId == user.userId || user.moderator == true">
        <v-icon @click="dialog = true" class="red lighten-1 rounded my-1 mx-3">mdi-close-box-outline</v-icon>
      </div>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Etes-vous sur de supprimer ce commentaire ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteComment">Oui</v-btn>
            <v-btn text @click="dialog = false">Non</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  props: {
    comment: Object
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    async deleteComment() {
      await axios.delete(
        "http://localhost:3000/comment/" + this.$props.comment.id
      );
      this.$emit("deleted", this.$props.comment.id);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
