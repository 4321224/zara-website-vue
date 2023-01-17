<script>
import FormTable from "../components/FormTable.vue";
export default {
  name: "EditProductPage",
  components: { FormTable },
  props: ["dataId", "page", "dataCategory", "dataProduct"],
  emits: ["cancelProduct", "editProduct"],
  methods: {
    cancelProduct() {
      this.$emit("cancelProduct");
    },
    editProduct(data, id) {
      // console.log(data, id, "ini dari emit");
      this.$emit("editProduct", data, id);
    },
  },
};
</script>

<template>
  <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h3 class="display-2">Edit Product</h3>
        <FormTable
          :dataProduct="dataProduct"
          :dataId="dataId"
          :dataCategory="dataCategory"
          :page="page"
          @cancelProduct="cancelProduct"
          @editProduct="editProduct"
        />
      </div>
    </div>
  </section>
</template>
