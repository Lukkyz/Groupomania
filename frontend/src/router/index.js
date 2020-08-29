import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post";
import Signin from "../views/Signin";
import Chat from "../views/Chat";
import Profile from "../views/Profile";
import store from "../store";
Vue.use(VueRouter);

const isAuth = (to, from, next) => {
  if (!store.getters.user.token) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const restrictAuth = (to, from, next) => {
  if (store.getters.user.token) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  { path: "/", name: "Home", component: Home, beforeEnter: isAuth },
  {
    path: "/post/:id",
    name: "Post",
    component: Post,
    beforeEnter: isAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: restrictAuth,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    beforeEnter: restrictAuth,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    beforeEnter: isAuth,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/about",
    name: "About",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (store.getters.user.id && !store.getters.loading && to.name !== "Login") {
    await store.dispatch("refresh");
    store.dispatch("load");
  }
  next();
});

export default router;
