<script>
import { useProductStore } from "../stores/productStore";
import { mapActions, mapState } from "pinia";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "HomeView",
  data() {
    return {
      searchData: "",
    };
  },
  components: {
    ProductCard,
  },
  methods: {
    ...mapActions(useProductStore, ["fetchReadProduct", "checkLogin"]),
  },
  computed: {
    ...mapState(useProductStore, ["dataProduct", "isLogin", "totalPage"]),
  },
  created() {
    this.fetchReadProduct(1);
    this.checkLogin();
  },
};
</script>

<template>
  <div class="container d-flex justify-content-center mt-100">
    <div class="row">
      <form @submit.prevent="fetchReadProduct('', searchProduct)" action="POST">
        <div class="search">
          <input
            v-model="searchProduct"
            class="search_input"
            type="text"
            name=""
            placeholder="Search here..."
            aria-describedby="button-addon2"
          />
          <button
              class="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            />
        </div>
      </form>
      <div class="container text-center mt-5">
        <div class="row">
          <ProductCard
            v-for="product in dataProduct"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"></li>
          <li v-for="page in totalPage" :key="page.id" class="page-item">
            <a
              @click.prevent="fetchReadProduct(page)"
              class="page-link"
              href="#"
              >{{ page }}</a
            >
          </li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
