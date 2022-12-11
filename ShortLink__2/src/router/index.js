import { resolveDirective } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login/Login.vue";
import Register from "../components/login/Register.vue";
import Dashboard from "../components/home/Dashboard.vue";

import HomeView from "../components/home/Home.vue";
import Redirect from "../components/redirect/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "regis",
      component: () => import("../components/login/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../components/home/Dashboard.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/login/Login.vue"),
    },
    {
      path: "/to/:catchAll(.*)",
      name: "redirect",

      component: Redirect,
    },
  ],
});

export default router;
