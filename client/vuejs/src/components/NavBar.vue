<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/productStore";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(useProductStore, ["logout"]),
  },
  computed: {
    ...mapState(useProductStore, ["isLogin"]),
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-md" id="app-navbar">
      <div class="container">
        <a
          @click.prevent="$router.push('/')"
          class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
          href="#"
        >
          <img
            src="https://logosmarcas.net/wp-content/uploads/2020/05/Zara-Logo-650x366.png"
            alt="ZARA"
            width="50"
            class="d-inline-block me-2"
          />
        </a>
        <button
         
          @click.prevent="$router.push('/')"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar">
            <ul class="navbar-nav">
              <li class="nav-link px-4 text-center col-4">
                <router-link to="/" href="#">Home</router-link>
              </li>
              <li v-if="!isLogin" class="nav-link px-4 text-center col-4">
                <router-link to="/login" href="#">Login</router-link>
              </li>
              <li v-if="isLogin" class="nav-link px-4 text-center col-4">
                <router-link to="/wishlist" href="#">Wishlist</router-link>
              </li>
              <li  class="nav-link px-4 text-center col-4">
                <div v-if="isLogin === true">
                  <a @click.prevent="logout" href="#">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
