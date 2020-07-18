<template>
  <div>
    <v-card class="mx-auto mb-4" color="white" max-width="800">
      <v-card-title class="d-flex justify-space-between">
        <span class="title font-weight-bold">{{ post.title }}</span>
        <span class="subtitle-2">{{ "Crée : " + parse(post.createdAt) }}</span>
        <span
          v-if="parse(post.createdAt) !== parse(post.updatedAt)"
          class="subtitle-2"
        >{{ "Modifié : " + parse(post.updatedAt) }}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-light" color="white">{{ post.body }}</v-card-text>

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
    <div v-if="show" class="w-800 mx-auto my-5">
      <v-textarea v-model="comment" rows="2" name="input-7-1" label="Ecrivez..."></v-textarea>
      <v-btn small :disabled="!valid">Envoyer</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    unique: Boolean
  },
  data() {
    return {
      comment: "",
      valid: true,
      show: false
    };
  },
  methods: {
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
    }
  }
};
</script>

<style>
</style>
