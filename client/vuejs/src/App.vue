<script>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    RouterView,
  },
};
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>
