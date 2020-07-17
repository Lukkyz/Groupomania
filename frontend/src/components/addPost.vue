<template>
  <v-form v-model="valid" class="w-800 mx-auto my-5">
    <div class="my-2">
      <v-btn small @click="manageBtn">Ajouter un post</v-btn>
    </div>
    <transition name="fade">
      <div v-if="show" class="add-post">
        <v-text-field v-model="title" label="Titre" :rules="[ rules.title ]" hide-details="auto"></v-text-field>
        <v-textarea
          v-model="body"
          rows="2"
          name="input-7-1"
          :rules="[ rules.body ]"
          label="Ecrivez..."
        ></v-textarea>
        <v-btn small :disabled="!valid" @click="submit(title, body, userId)">Envoyer</v-btn>
      </div>
    </transition>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
      body: "",
      show: false,
      userId: this.$store.getters["user"].userId,
      valid: true,
      rules: {
        title: v =>
          /^[\s\w-éàëêâ]{5,100}\w$/.test(v) ||
          "Le texte est invalide, il ne doit contenir que des caractères non spéciaux (min 5, max 100)",
        body: v =>
          /^[\s\w-éàëêâ]{50,500}\w$/.test(v) ||
          "Le texte est invalide, il ne doit contenir que des caractères non spéciaux (min 50, max 500)"
      }
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    manageBtn() {
      console.log();
      this.show = !this.show;
    },
    submit(title, body, userId) {
      this.addPost({ title, body, userId }).then(() => {
        this.body = "";
        this.title = "";
        this.show = false;
      });
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style>
.w-800 {
  max-width: 800px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  margin-left: -100px;
}
</style>

