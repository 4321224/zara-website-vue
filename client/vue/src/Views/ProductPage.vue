<script>
import TablePage from "./TablePage.vue";
export default {
  name: "ProductPage",
  props: ["dataProduct", "page"],
  emits: ["addProduct", "getProductId", "statusProduct"],
  methods: {
    addProduct() {
      this.$emit("addProduct");
    },
    getProductId(id) {
      this.$emit("getProductId", id);
    },
    statusProduct(status, id) {
      this.$emit("statusProduct", status, id);
    },
  },
  components: {TablePage},
  // created(){
  //   this.fetch()
  // }

};
</script>

<template>
    <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h2 class="mt-3">Table Product</h2>
        <button class="btn btn-dark mb-3" id="new-product" @click="addProduct">
            <span class="icon material-symbols-outlined"></span>Add New Product
          </button>
        
        <TablePage
            :dataProduct="dataProduct"
            :page="page"
            @getProductId="getProductId"
            @statusProduct="statusProduct"
        />
  </div>
  </div>
  </section>
</template>
