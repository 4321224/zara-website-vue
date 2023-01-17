<script>
const baseUrl = "http://localhost:3000";
// const baseUrl = "https://secret-inlet-82197.herokuapp.com"
import LoginPage from "./Views/LoginPage.vue";
import Navbar from "./components/Navbar.vue";
import HomePage from "./Views/HomePage.vue";
import ProductPage from "./Views/ProductPage.vue";
import HistoryPage from "./Views/HistoryPage.vue";
import CategoryPage from "./Views/CategoryPage.vue";
import AddProductPage from "./Views/AddProductPage.vue";
import AddCategoryPage from "./Views/AddCategoryPage.vue";
import EditProductPage from "./Views/EditProductPage.vue";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    LoginPage,
    Navbar,
    HomePage,
    ProductPage,
    HistoryPage,
    CategoryPage,
    AddProductPage,
    AddCategoryPage,
    EditProductPage,
  },
  data() {
    return {
      isLogin: false,
      page: "",
      totalProduct: 0,
      totalCategory: 0,
      dataCategory: [],
      dataProduct: [],
      dataId: [],
      dataHistory: [],
      loginGoogle: "buttonDiv",
    };
  },
  methods: {
    changePage(value) {
      this.page = value;
    },
    async logIn(result) {
      try {
        // console.log(result, "<< sampe sini");
        const { email, password } = result;
        let dataLogin = await axios({
          url: `${baseUrl}/login`,
          method: "POST",
          data: {
            email,
            password,
          },
        });
        localStorage.setItem("access_token", dataLogin.data.access_token);
        localStorage.setItem("username", dataLogin.data.username);
        localStorage.setItem("role", dataLogin.data.role);

        this.changePage("home");
        this.isLogin = true;
        Swal.fire({
          icon: "success",
          title: "Success signing in!",
          text: `Yeay, ${dataLogin.data.username} success login!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Something happened...",
          text: error.response.data.error.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async signUp(data) {
      // console.log(data);
      try {
        let { username, email, password, phoneNumber, address } = data;
        let dataRegister = await axios({
          url: `${baseUrl}/register`,
          method: "POST",
          data: {
            username,
            email,
            password,
            phoneNumber,
            address,
          },
        });
        // console.log(dataRegister);
        this.changePage("login");
        Swal.fire({
          icon: "success",
          title: `Yeay, you are now registered!`,
          text: "Now you may log in to see our product",
          confirmButtonText: "Log in now",
        });
      } catch (error) {
        // console.log(error, "ini response error");
        Swal.fire({
          icon: "error",
          title: "Oops! Something happened...",
          text: `${error.response.data.error.message}`,
          confirmButtonText: "Try Again",
        });
      }
    },

    async home() {
      try {
        let dataProduct = await axios({
          url: `${baseUrl}/products`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        let dataCategory = await axios({
          url: `${baseUrl}/categories`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.totalProduct = dataProduct.data.length;
        this.totalCategory = dataCategory.data.length;
        this.changePage("home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Something happened...",
          text: error.response.data.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async product() {
      try {
        let { data } = await axios({
          url: `${baseUrl}/products`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataProduct = data;
        this.fetch();
        this.changePage("product");
      } catch (error) {
        console.log(error);
      }
    },
    async getProductId(id) {
      try {
        let dataProductId = await axios({
          url: `${baseUrl}/products/${id}`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(dataProductId.data, "<== ini data product");
        this.dataId = dataProductId.data;
        this.changePage("editProduct");
      } catch (error) {
        console.log(error);
      }
    },
    async category() {
      try {
        let dataCategory = await axios({
          url: `${baseUrl}/categories`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.changePage("category");
        this.fetchCategory();
      } catch (error) {
        console.log(error);
      }
    },
    async history() {
      try {
        let dataHistory = await axios({
          url: `${baseUrl}/history`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.changePage("history");
      } catch (error) {
        console.log(error);
      }
    },
    async statusProduct(status, id) {
      // console.log(status, id, "ini dari client");
      try {
        let productStatus = await axios({
          url: `${baseUrl}/products/${id}`,
          method: "PATCH",
          data: {
            status,
          },
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire("Yeay!", "Status has been updated");
        this.changePage("product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Failed to update product status",
          text: error.response.data.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async fetch() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/products`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataProduct = data;
        this.totalProduct = data.length;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCategory() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/categories`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataCategory = data;
        this.totalCategory = data.length;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHistory() {
      try {
        const data = await axios({
          url: `${baseUrl}/history`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataHistory = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addproduct(data) {
      // console.log(data);
      try {
        let { name, description, imgUrl, stock, price, categoryId } = data;
        let hasil = await axios({
          url: `${baseUrl}/products`,
          method: "POST",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            name,
            description,
            imgUrl,
            stock,
            price,
            categoryId,
          },
        });
        Swal.fire("Yeay!", "Success adding new product");
        this.fetch();
        this.fetchHistory();
        this.changePage("product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Failed to add new product",
          text: error.response.data.error.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async editProduct(data, id) {
      // console.log(data, "ini data dari edit", id, "ini dari id edit");
      try {
        let edit = await axios({
          url: `${baseUrl}/products/${id}`,
          method: "PUT",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            data,
          },
        });
        Swal.fire("Yeay!", "Success editing product");
        this.fetch();
        this.fetchHistory();
        this.changePage("product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Failed to edit this product...",
          text: error.response.data.error.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async addCategory(obj) {
      try {
        let { name } = obj;
        let hasil = await axios({
          url: `${baseUrl}/categories`,
          method: "POST",
          data: {
            name,
          },
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.fetchCategory();
        Swal.fire("Yeay!", "Success adding new category");
        this.changePage("category");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops! Failed to add new category...",
          text: error.response.data.error.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    async logout() {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You will be missed!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Signing out!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Signed out",
              text: `See you later!`,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.clear();
            this.isLogin = false;
            this.changePage("login");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async handleCredentialResponse(response) {
      // console.log("Encoded JWT ID token: " + response.credential);
      try {
        let data = await axios({
          url: `${baseUrl}/login-google`,
          method: "post",
          headers: {
            google_token: response.credential,
          },
        });
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("role", data.data.role);
        this.home();
        this.product()
       
        this.changePage("home");
        this.isLogin = true;
        Swal.fire({
          icon: "success",
          title: "Success signing in!",
          text: `Yeay, ${data.data.username} success login!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops! Something happened...",
          text: "Try login with other method",
          confirmButtonText: "Try Again",
        });
      }
    },
  },
  mounted() {
    let cb = this.handleCredentialResponse;
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "905910788791-uv56a008snkjr087jm7ml62ii5ljck2i.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    };
    window.onclick = function () {
      google.accounts.id.initialize({
        client_id:
          "905910788791-uv56a008snkjr087jm7ml62ii5ljck2i.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    };
  },
  async created() {
    const access_token = localStorage.getItem("access_token");
    // console.log(access_token);
    if (access_token) {
      
      this.fetchCategory();
      this.fetchHistory();
      this.isLogin = true;
      this.changePage("home");
    } else {
      this.changePage("login");
      this.isLogin = false;
    }
  },
};
</script>

<template>
  <div>
    <Navbar
      v-if="page !== 'login'"
      :isLogin="isLogin"
      @home="changePage('home')"
      @product="changePage('product')"
      @category="changePage('category')"
      @history="changePage('history')"
      @logout="logout"
    />

    <LoginPage
      v-if="page === 'login'"
      :loginGoogle="loginGoogle"
      @signUp="signUp"
      @logIn="logIn"
    />

    <HomePage
      v-else-if="page === 'home'"
      :dataProduct="dataProduct.length"
      :dataCategory="dataCategory.length"
      @fetch="fetch"
      @fetchCategory="fetchCategory"
    />
    <ProductPage
      v-else-if="page === 'product'"
      :dataProduct="dataProduct"
      :page="page"
      @fetch="fetch"
      @addProduct="changePage('addProduct')"
      @getProductId="getProductId"
      @statusProduct="statusProduct"
    />
    <HistoryPage
      v-else-if="page === 'history'"
      :page="page"
      :dataHistory="dataHistory"
    />

    <AddProductPage
      v-else-if="page === 'addProduct'"
      @cancelProduct="changePage('product')"
      @addproduct="addproduct"
      :dataProduct="dataProduct"
      :page="page"
      :dataCategory="dataCategory"
    />

    <EditProductPage
      v-else-if="page === 'editProduct'"
      :dataProduct="dataProduct"
      :dataId="dataId"
      :page="page"
      :dataCategory="dataCategory"
      @cancelProduct="changePage('product')"
      @editProduct="editProduct"
      @getProductId="getProductId"
    />

    <CategoryPage
      v-else-if="page === 'category'"
      :page="page"
      :dataCategory="dataCategory"
      @addCategory="changePage('addCategory')"
    />
    <AddCategoryPage
      v-else-if="page === 'addCategory'"
      :dataCategory="dataCategory"
      :page="page"
      @cancelCategory="changePage('category')"
      @addCategory="addCategory"
    />
  </div>
</template>
