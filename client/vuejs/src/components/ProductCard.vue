<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/productStore";

export default {
  name: "ProductCard",
  props: ["product"],
  methods: {
    ...mapActions(useProductStore, ["addWishlist"]),
  },
};
</script>

<template>
  <div class="col-4 mt-3">
    <div class="card m-3">
      <div class="card-body text-center">
        <img :src="product.imgUrl" style="width: 150px" />
        <h4 class="card-title mb-4">{{ product.name }}</h4>
        <a
          @click.prevent="$router.push(`products/${product.id}`)"
          href="#"
          class="card-link"
          >See Details</a
        >
        <i
          @click="addWishlist(product.id)"
          class="bi bi-heart-fill card-link"
        ></i>
      </div>
    </div>
  </div>
</template>
