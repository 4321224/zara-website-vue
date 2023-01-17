<script>
import RowTableProduct from "../components/RowTableProduct.vue";
import RowTableHistory from "../components/RowTableHistory.vue";
import RowTableCategory from "../components/RowTableCategory.vue";
export default {
  name: "TablePage",
  components: {
    RowTableProduct,
    RowTableHistory,
    RowTableCategory,
  },
  props: ["dataProduct", "page", "dataHistory", "dataCategory"],
  emits: ["getProductId", "statusProduct"],
  methods: {
    getProductId(id) {
      this.$emit("getProductId", id);
    },
    statusProduct(status, id) {
      this.$emit("statusProduct", status, id);
    },
  },
  components: { RowTableProduct, RowTableHistory, RowTableCategory },
};
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="table-responsive">
        <!-- tabel product -->
        <table v-if="page === 'product'" class="table bg-white rounded border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Images</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <RowTableProduct
              v-for="(product, index) in dataProduct"
              :key="index"
              :data="product"
              :index="index"
              @getProductId="getProductId"
              @statusProduct="statusProduct"
            />
          </tbody>
        </table>
        <!-- tabel history -->
        <table
          v-else-if="page === 'history'"
          class="table bg-white rounded border"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created At</th>
              <th scope="col">Update By</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <RowTableHistory
              v-for="(history, index) in dataHistory.data"
              :key="index"
              :data="history"
              :index="index"
            />
          </tbody>
        </table>
        <!-- table category -->
        <table
          v-else-if="page === 'category'"
          class="table bg-white rounded border"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <RowTableCategory
              v-for="(category, index) in dataCategory"
              :key="index"
              :data="category"
              :index="index"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
