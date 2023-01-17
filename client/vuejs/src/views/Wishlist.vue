<script>
import { useProductStore } from "../stores/productStore";
import { mapActions, mapState } from "pinia";
import WishlistCard from "../components/WishlistCard.vue";

export default {
  name: "Wishlist",
  components: {
    WishlistCard,
  },
  methods: {
    ...mapActions(useProductStore, ["readWishlist"]),
  },
  computed: {
    ...mapState(useProductStore, ["dataWishlist"]),
  },
  created() {
    this.readWishlist();
    console.log(this.readWishlist, "ini dari wishlist card");
  },
};
</script>

<template>
  <div class="container-fluid" style="min height:100vh">
    <div class="container mt-5">
      <div class="container-fluid">
        <h2>My Wishlist Product</h2>
        <div class="row">
          <WishlistCard
            v-for="wishlist in dataWishlist"
            :key="wishlist.id"
            :wishlist="wishlist.Product"
          />
          <div class="col-sm-3 mt-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
