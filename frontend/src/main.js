import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + store.getters.user.token;
  return config;
});

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
