<script>
export default {
  name: "WishlistCard",
  props: ["wishlist"],
};
</script>

<template>
  <div class="d-flex col-6 row-6 mt-3">
    <div class="card m-3">
      <div class="card-body text-center">
        <img :src="wishlist.imgUrl" style="width: 100px" />
        <h4 class="card-title mb-4">{{ wishlist.name }}</h4>
        <p>{{ wishlist.description }}</p>
      </div>
    </div>
  </div>
</template>
