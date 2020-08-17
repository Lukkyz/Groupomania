<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="900">
      <v-card-title class="d-flex justify-space-between">
        <span class="subtitle-1">{{ post.title }}</span>
        <span class="subtitle-2">{{ "Crée : " + parse(post.createdAt) }}</span>
        <span
          v-if="parse(post.createdAt) !== parse(post.updatedAt)"
          class="subtitle-2"
        >{{ "Modifié : " + parse(post.updatedAt) }}</span>
      </v-card-title>

      <v-card-text
        class="text-black subtitle-1 font-weight-light"
      >{{ !unique ? truncate(post.body, 100) : post.body }}</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>{{ post.user.firstName + " " + post.user.lastName}}</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <div v-if="post.userId == user.userId || user.moderator == true">
              <v-icon
                @click="dialog = true"
                class="red lighten-1 rounded my-1 mx-3"
              >mdi-close-box-outline</v-icon>
            </div>
            <router-link v-if="unique == false" :to="{ name: 'Post', params: {id: post.id}}">
              <span class="mr-2">Voir plus...</span>
            </router-link>
            <div v-else>
              <div class="my-2">
                <v-btn text small @click="manageInput">Répondre</v-btn>
              </div>
            </div>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-message-text</v-icon>
            <span class="subheading">{{ post.comments ? post.comments.length : 0 }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-form v-model="valid" v-if="show" class="w-800 mx-auto my-5">
      <v-textarea v-model="body" :rules="[rules.body]" rows="2" name="input-7-1" label="Ecrivez..."></v-textarea>
      <v-btn small :disabled="!valid" @click="submit(body, post.id)">Envoyer</v-btn>
    </v-form>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Etes-vous sur de supprimer ce commentaire ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteAPost">Oui</v-btn>
            <v-btn text @click="dialog = false">Non</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    post: Object,
    unique: Boolean
  },
  data() {
    return {
      body: "",
      valid: true,
      show: false,
      dialog: false,
      rules: {
        body: v =>
          /^[\s\w-éàëêâ]{5,100}\w$/.test(v) ||
          "Le texte est invalide, il ne doit contenir que des caractères non spéciaux (min 5, max 100)"
      }
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["addComment", "deletePost"]),
    deleteAPost() {
      this.deletePost(this.$props.post.id);
      this.dialog = false;
      if (this.$props.unique) {
        this.$router.go(-1);
      }
      this.$emit("deleted", this.$props.post.id);
    },
    parse(string) {
      let date = new Date(string);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return (
        date.toLocaleDateString("fr-FR", options) +
        " " +
        date.toLocaleTimeString("fr-FR")
      );
    },
    manageInput() {
      this.show = !this.show;
    },
    submit(body, postId) {
      let obj = {
        body,
        postId,
        userId: this.$store.getters["user"].userId
      };
      this.addComment(obj);
      this.show = false;
      this.body = "";
    },
    validate() {
      this.$refs.form.validate();
    },
    truncate(text, num) {
      let arr = text.split("");
      let textTronc = "";
      for (let i = 0; i < arr.length && i < num; i++) {
        textTronc += arr[i];
        if (i == num - 1) {
          textTronc += "...";
        }
      }
      return textTronc;
    }
  }
};
</script>

<style>
.text-black {
  color: black !important;
}
</style>
