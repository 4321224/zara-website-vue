<script>
import FormTable from "../components/FormTable.vue";
export default {
  name: "AddProductPage",
  components: {
    FormTable,
  },
  props: ["dataProduct", "page", "dataCategory"],
  emits: ["cancelProduct", "addproduct"],
  methods: {
    cancelProduct() {
      this.$emit("cancelProduct");
    },
    addproduct(data) {
      this.$emit("addproduct", data);
    },
  },
};
</script>

<template>
  <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h3 class="display-2">New Product</h3>
        <FormTable
          :dataProduct="dataProduct"
          :dataCategory="dataCategory"
          :page="page"
          @cancelProduct="cancelProduct"
          @addproduct="addproduct"
        />
      </div>
    </div>
  </section>
</template>
