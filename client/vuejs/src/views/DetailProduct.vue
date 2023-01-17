<script>
import { useProductStore } from "../stores/productStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "DetailProduct",
  methods: {
    ...mapActions(useProductStore, ["getProductById", "checkLogin", "addWishlist", "QRToken"]),
  },
  computed: {
    ...mapState(useProductStore, ["dataById", "QRCode"]),
    toRupiah() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.dataById.price);
    },
  },
  created() {
    this.checkLogin();
    this.getProductById(this.$route.params.productId);
    this.QRToken(this.$route.params.productId)
  },
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-5">
        <div class="main-img">
          <img class="img-fluid" :src="dataById.imgUrl" />
        </div>
      </div>
      <div class="col-md-7">
        <div class="main-description px-2">
          <h2 class="text-uppercase">{{ dataById.name }}</h2>
          <p>{{ dataById.description }}</p>
          <ul class="prod-detail">
            <li>
              <p><strong>Price:</strong> {{ toRupiah }}</p>
            </li>
            <li>
              <p><strong>Stock:</strong> {{ dataById.stock }}</p>
            </li>
            <li>
              <p><strong>Status:</strong> {{ dataById.status }}</p>
            </li>
          </ul>
          <div class="buttons d-flex my-5">
          </div>
        </div>
        <img :src="QRCode" class="h-full w-full rounded-t pb-6" />
      </div>
    </div>
  </div>
</template>
