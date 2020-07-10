<template>
  <v-form v-model="valid" class="col-sm-6 offset-4 mt-5">
    <v-container>
      <h3 class="mb-2">Connexion</h3>
      <v-row>
        <v-col cols="12" md="7">
          <v-text-field v-model="email" :rules="[rules.email]" label="E-mail" required></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            v-model="password"
            :rules="[rules.password]"
            type="password"
            label="Mot de passe"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="onSubmit" :disabled="!valid" color="success" class="mr-4">Connexion</v-btn>
    </v-container>
  </v-form>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      rules: {
        password: v =>
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) ||
          "Le mot de passe est invalide",
        email: v =>
          /^\w{3,}@\w{3,}\.\w{2,3}$/.test(v) ||
          "L'email est invalide, ex. d'e-mail valide: john@doe.com"
      }
    };
  },
  methods: {
    ...mapActions(["logIn"]),
    onSubmit(e) {
      e.preventDefault();
      this.logIn({ email: this.email, password: this.password });
    },
    validate() {
      this.$refs.form.validate();
    }
  },
  computed: mapGetters(["user"])
};
</script>
