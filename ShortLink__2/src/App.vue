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

<!-- 
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
