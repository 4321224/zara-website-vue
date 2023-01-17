<script>
export default {
  name: "Navbar",
  props: ["isLogin"],
  emits: ["home", "product", "category", "history", "logout"],
  methods: {
    logout() {
      this.$emit("logout");
    },
    home() {
      this.$emit("home");
    },
    product() {
      this.$emit("product");
    },
    category() {
      this.$emit("category");
    },
    history() {
      this.$emit("history");
    },
  },
};
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
          <img
            src="https://logosmarcas.net/wp-content/uploads/2020/05/Zara-Logo-650x366.png"
            alt="ZARA"
            width="50"
            class="d-inline-block me-2"
          />
        </a>
        <button
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
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="products" @click.prevent="product"
                  >Product</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="categories" @click.prevent="category"
                  >Category</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="histories" @click.prevent="history"
                  >History</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout">Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
