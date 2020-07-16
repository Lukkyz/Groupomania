<template>
  <div class="w-800 mx-auto my-5">
    <div class="my-2">
      <v-btn small @click="manageBtn">Ajouter un post</v-btn>
    </div>
    <transition name="fade">
      <div v-if="show" class="add-post">
        <v-text-field label="Titre" :rules="rules" hide-details="auto"></v-text-field>
        <v-textarea rows="2" name="input-7-1" label="Ecrivez..."></v-textarea>
        <v-btn small>Envoyer</v-btn>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    manageBtn() {
      this.show = !this.show;
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

