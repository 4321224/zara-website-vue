<script>
import ButtonComponent from "./ButtonComponent.vue";
export default {
  name: "FormTable",
  components: {
    ButtonComponent,
  },
  data() {
    return {
      productData: {
        name: "",
        image: "",
        stock: "",
        price: "",
        category: "",
      },
      categoryData: {
        name: "",
      },
    };
  },
  props: ["dataProduct", "dataCategory", "page", "dataId"],
  emits: [
    "cancelProduct",
    "cancelCategory",
    "addproduct",
    "addCategory",
    "editProduct",
  ],
  methods: {
    cancelProduct() {
      this.$emit("cancelProduct");
    },
    addproductHandler() {
      this.$emit("addproduct", {
        name: this.productData.name,
        description: this.productData.description,
        imgUrl: this.productData.image,
        stock: this.productData.stock,
        price: this.productData.price,
        categoryId: this.productData.category,
      });
    },
    addCategoryHandler() {
      this.$emit("addCategory", {
        name: this.categoryData.name,
      });
    },
    editProduct() {

      this.$emit("editProduct", {
        name: this.productData.name,
        description: this.productData.description,
        imgUrl: this.productData.image,
        stock: this.productData.stock,
        price: this.productData.price,
        categoryId: this.productData.category,
      },this.dataId.id);
    },
  },
  created() {
    if (this.page === "editProduct") {
      this.productData.name = this.dataId.name;
      this.productData.description = this.dataId.description;
      this.productData.image = this.dataId.imgUrl;
      this.productData.stock = this.dataId.stock;
      this.productData.price = this.dataId.price;
      this.productData.category = this.dataId.categoryId;
    }
  },
};
</script>

<template>
  <div class="row">
    <div class="col-12 col-md-6" v-if="page === 'addProduct'">
      <form id="product-form" @submit.prevent="addproductHandler()">
        <div class="form-group">
          <label for="product-name" class="form-label">Name</label>
          <input
            v-model="this.productData.name"
            type="text"
            class="form-control"
            id="product-name"
            placeholder="Enter name product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="product-description" class="form-label"
            >Description</label
          >
          <input
            v-model="this.productData.description"
            type="text"
            class="form-control"
            id="product-description"
            placeholder="Enter description product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="product-price" class="form-label">Price</label>
          <input
            v-model="this.productData.price"
            type="number"
            class="form-control"
            id="product-price"
            placeholder="Enter price product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="product-stock" class="form-label">Stock</label>
          <input
            v-model="this.productData.stock"
            type="number"
            class="form-control"
            id="product-stock"
            placeholder="Enter stock product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="product-image" class="form-label">Image</label>
          <input
            v-model="this.productData.image"
            type="text"
            class="form-control"
            id="product-image"
            placeholder="Enter image product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="product-category" class="form-label">Category</label>
          <select
            v-model="this.productData.category"
            id="product-category"
            class="form-select"
          >
            <option value="" selected disabled>-- Select Category --</option>
            <option
              v-for="category in dataCategory"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="row mt-5 mb-3">
          <div class="col-6">
            <a
              class="btn btn-lg btn-light rounded-pill w-100 p-2"
              href=""
              @click.prevent="cancelProduct"
              >Cancel</a
            >
          </div>
          <div class="col-6">
            <button
              class="btn btn-lg btn-primary rounded-pill w-100 p-2"
              type="submit"
              href=""
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <!-- ini category -->
    <div class="col-12 col-md-6" v-else-if="page === 'addCategory'">
      <form id="product-form" @submit.prevent="addCategoryHandler()">
        <div class="form-group">
          <label for="product-name" class="form-label">Name</label>
          <input
            v-model="this.categoryData.name"
            type="text"
            class="form-control"
            id="product-name"
            placeholder="Enter name product"
            autocomplete="off"
          />
        </div>
        <div class="row mt-5 mb-3">
          <div class="col-6">
            <ButtonComponent
              @click="cancelCategory"
              :class="'btn btn-lg btn-light rounded-pill w-100 p-2'"
              :type="button"
              :style="'background-color: #555555'"
              :title="'Cancel'"
            />
          </div>
          <div class="col-6">
            <ButtonComponent
              :class="'btn btn-lg btn-light rounded-pill w-100 p-2'"
              :type="button"
              :style="'background-color: #555555'"
              :title="'Submit'"
            />
          </div>
        </div>
      </form>
    </div>
    <!-- ini edit -->
    <div class="col-12 col-md-6" v-if="page === 'editProduct'">
      <form id="product-form" @submit.prevent="editProduct(dataId.id)">
        <div class="form-group">
          <label for="edit-product-name" class="form-label">Name</label>
          <input
            v-model="this.productData.name"
            type="text"
            class="form-control"
            id="edit-product-name"
            placeholder="Enter name product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="edit-product-description" class="form-label"
            >Description</label
          >
          <input
            v-model="this.productData.description"
            type="text"
            class="form-control"
            id="edit-product-description"
            placeholder="Enter description product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="edit-product-price" class="form-label">Price</label>
          <input
            v-model="this.productData.price"
            type="number"
            class="form-control"
            id="edit-product-price"
            placeholder="Enter price product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="edit-product-stock" class="form-label">Stock</label>
          <input
            v-model="this.productData.stock"
            type="number"
            class="form-control"
            id="edit-product-stock"
            placeholder="Enter stock product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="edit-product-image" class="form-label">Image</label>
          <input
            v-model="this.productData.imgUrl"
            type="text"
            class="form-control"
            id="edit-product-image"
            placeholder="Enter image product"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="edit-product-category" class="form-label">Category</label>
          <select
            v-model="this.productData.category"
            id="edit-product-category"
            class="form-select"
          >
            <option value="" selected disabled>-- Select Category --</option>
            <option
              v-for="category in dataCategory"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="row mt-5 mb-3">
          <div class="col-6">
            <ButtonComponent
              @click="cancelProduct"
              :class="'btn btn-lg btn-light rounded-pill w-100 p-2'"
              :type="button"
              :style="'background-color: #555555'"
              :title="'Cancel'"
            />
          </div>
          <div class="col-6">
            <ButtonComponent
              :class="'btn btn-lg btn-light rounded-pill w-100 p-2'"
              :type="button"
              :style="'background-color: #555555'"
              :title="'Submit'"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
