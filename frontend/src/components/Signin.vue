<template>
  <v-form v-model="valid" class="col-sm-8 offset-2 mt-5">
    <v-container>
      <h3 class="mb-2">Crée un compte</h3>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="email" :rules="[rules.email]" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field v-model="fName" :rules="[rules.fName]" label="Prénom" required></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field v-model="lName" :rules="[rules.lName]" label="Nom" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            :rules="[rules.password]"
            type="password"
            label="Mot de passe"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="confPassword"
            :rules="[rules.confPassword]"
            type="password"
            label="Mot de passe"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <p v-if="error">{{ error }}</p>
      <v-btn @click="onSubmit" :disabled="!valid" color="success" class="mr-4">Connexion</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      valid: true,
      email: "",
      fName: "",
      lName: "",
      password: "",
      confPassword: "",
      rules: {
        fName: v => /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le prénom est invalide",
        lName: v => /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le nom est invalide",
        password: v =>
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) ||
          "Le mot de passe est invalide",
        confPassword: v =>
          (/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) &&
            v === this.password) ||
          "Le mot de passe ne correspond pas",
        email: v =>
          /^\w{3,}@\w{3,}\.\w{2,3}$/.test(v) ||
          "L'email est invalide, ex. d'e-mail valide: john@doe.com"
      }
    };
  },
  methods: {
    ...mapActions(["signIn", "logIn"]),
    onSubmit(e) {
      e.preventDefault();
      this.signIn({
        email: this.email,
        firstName: this.fName,
        lastName: this.lName,
        password: this.password
      }).then(() => {
        this.logIn({ email: this.email, password: this.password });
      });
    },
    validate() {
      this.$refs.form.validate();
    }
  },
  computed: mapGetters(["user", "error"])
};
</script>

<style>
</style>
