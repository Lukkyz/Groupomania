<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="900">
      <v-card-title class="d-flex justify-space-between">
        <span class="subtitle-1">{{ post.title }}</span>
        <span class="subtitle-2">{{ "Crée : " + parse(post.createdAt) }}</span>
      </v-card-title>

      <v-card-text
        class="text-black subtitle-1 font-weight-light"
      >{{ !unique ? truncate(post.body, 100) : post.body }}</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <router-link :to="{ name: 'Profile', params: {id: post.userId}}">
              <v-list-item-title>{{ post.user.firstName + " " + post.user.lastName}}</v-list-item-title>
            </router-link>
          </v-list-item-content>
          <span class="mt-2">{{ post.score }}</span>
          <span v-if="score == 1" class="mt-2" @click="changeScore(0)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="green" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
            </svg>
          </span>
          <span v-else-if="score == 0" class="mt-2" @click="changeScore(1)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16,13V21H8V13H2L12,3L22,13H16M7,11H10V19H14V11H17L12,6L7,11Z"
              />
            </svg>
          </span>

          <span class="mt-2" v-if="score == -1" @click="changeScore(0)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="red"
                d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z"
              />
            </svg>
          </span>
          <span v-else-if="score == 0" class="mt-2" @click="changeScore(-1)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22,11L12,21L2,11H8V3H16V11H22M12,18L17,13H14V5H10V13H7L12,18Z"
              />
            </svg>
          </span>

          <v-row align="center" justify="end">
            <div v-if="post.userId == user.userId || user.moderator == true">
              <v-icon
                @click="dialog = true"
                class="red lighten-1 rounded my-1 mx-3"
              >mdi-close-box-outline</v-icon>
            </div>

            <v-icon class="red mr-1">mdi-arrow-compress-all</v-icon>
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
      score: 0,
      rules: {
        body: v =>
          /^[\s\w-éàëêâ]{5,100}\w$/.test(v) ||
          "Le texte est invalide, il ne doit contenir que des caractères non spéciaux (min 5, max 100)"
      }
    };
  },
  computed: {
    ...mapGetters([
      "user",
      "postLiked",
      "postDisliked",
      "isLiked",
      "isDisliked"
    ])
  },
  mounted() {
    if (this.isLiked(this.$props.post.id)) {
      this.score = 1;
    }
    if (this.isDisliked(this.$props.post.id)) {
      this.score = -1;
    }
  },
  methods: {
    ...mapActions(["addComment", "deletePost", "addLikeDislike"]),
    changeScore(i) {
      // num -1 dislike, 0 cancel, 1 like
      this.addLikeDislike({
        id: this.$props.post.id,
        like: i,
        score: this.score
      });
      if (this.score == 1 || this.score == -1) {
        this.score = 0;
      } else {
        this.score = i;
      }
    },
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
