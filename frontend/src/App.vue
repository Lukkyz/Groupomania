<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Forum</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <div v-if="user.userId">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ user.firstName + " " + user.lastName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title @click="disconnect">Déconnexion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <router-link to="login">
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>Connexion</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/login">
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>Crée un compte</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="red" white>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="../public/icon-left-font-monochrome-black.png" class="logo" />
    </v-app-bar>

    <v-main>
      <router-view />
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center"></v-row>
      </v-container>
    </v-main>
    <v-footer color="red" app>
      <span class="black--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <div v-on:myevent="modal = true" v-if="modal">
      <v-row justify="center">
        <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>

            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

              <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  data: () => ({
    drawer: null,
    modal: false,
    dialog: true
  }),
  methods: {
    ...mapActions(["refresh", "logOut"]),
    disconnect() {
      this.logOut();
    }
  },
  computed: mapGetters(["user"])
};
</script>

<style>
.logo {
  margin-left: 1em;
  width: 10em;
}
body {
  overflow-y: hidden;
}
* {
  text-decoration: none;
}
</style>
