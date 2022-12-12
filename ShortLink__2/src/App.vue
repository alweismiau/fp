<script>
import "./assets/main.css";
import Home from "./components/home/Home.vue";
import Login from "./components/login/Login.vue";
import Register from "./components/login/Register.vue";
import Dashboard from "./components/home/Dashboard.vue";

export default {
  components: {
    Home,
    Login,
    Register,
    Dashboard,
  },
};
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
