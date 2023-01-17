import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://secret-inlet-82197.herokuapp.com"

export const useProductStore = defineStore("product", {
  state: () => ({
    isLogin: false,
    dataProduct: [],
    dataById: {},
    dataWishlist: [],
    QRCode: {},
    totalPage: 0,
    pageProduct: 1,
    query: "",
  }),
  actions: {
    checkLogin() {
      if (localStorage.getItem("access_token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    async fetchReadProduct(page, search) {
      if (!search) {
        this.query = `page=${page}`;
        this.pageProduct = page;
      } else {
        this.query = `search=${search}`;
      }
      console.log(this.query, "ini req query");
      try {
        let { data } = await axios({
          method: "GET",
          url: `${baseUrl}/pub/products?${this.query}`,
        });
        // console.log(data, "<<< ini data");
        this.dataProduct = data.data;
        this.totalPage = data.totalPage;
        this.router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async getProductById(productId) {
      // console.log(productId, "ini id product");
      try {
        let { data } = await axios({
          method: "GET",
          url: `${baseUrl}/pub/products/${productId}`,
          headers: {
            access_token: localStorage.getItem(`access_token`),
          },
        });
        console.log(data, "<<<ini data product by id");
        this.dataById = data.data;
        console.log(this.dataById, "<<<ini data yg dipake");
        this.router.push("/products/:productId");
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed out",
        text: "See you later!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.isLogin = false;
      localStorage.clear();
      this.router.push("/");
    },
    async login(email, password) {
      try {
        // console.log(this.router, "ini dari login");
        const response = await axios({
          url: `${baseUrl}/pub/login`,
          method: "POST",
          data: {
            email,
            password,
          },
        });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        Swal.fire(
          "Signing in success",
          `Welcome to Zara, ${response.data.username}!`
        );
        this.isLogin = true;
        this.router.push("/");
      } catch (error) {
        console.log(error, "<<<<");
        Swal.fire({
          icon: "error",
          text: `${error.response.data.error.message}`,
        });
      }
    },
    async register(result) {
      // console.log(result, "ini result registrasi");
      try {
        const dataRegist = await axios({
          url: `${baseUrl}/pub/register`,
          method: "POST",
          data: {
            username: result.username,
            email: result.email,
            password: result.password,
            phoneNumber: result.phoneNumber,
            address: result.address,
          },
        });
        Swal.fire({
          icon: "success",
          title: `You have been registered!`,
          text: "Now you may sign in to use our services",
          confirmButtonText: "Sign in now",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: `${error.response.data.error.message}`,
        });
      }
    },
    async addWishlist(id) {
      // console.log(id, "ini wishlist");
      try {
        const { data } = await axios({
          url: `${baseUrl}/pub/wishlist/${id}`,
          method: "POST",
          headers: {
            access_token: localStorage.getItem(`access_token`),
          },
        });
        Swal.fire("Yeay!", "Product has been added to your wishlist");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops, something's not right!",
          text: `${error.response.data.error.message}`,
        });
      }
    },
    async readWishlist() {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${baseUrl}/pub/wishlist`,
          headers: {
            access_token: localStorage.getItem(`access_token`),
          },
        });
        // console.log(data, "<<< ini data dari getWishlist");
        this.dataWishlist = data.data;
        // console.log(this.dataWishlist, ">>> data wishlist");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops, something's not right!",
          text: `${error.response.data.error.message}`,
        });
      }
    },
    async handleCredentialResponse(response) {
      try {
        console.log("Encoded JWT ID token: " + response.credential);
        const { credential } = response;
        const {data} = await axios({
          method: "POST",
          url: baseUrl + `/pub/login-google`,
          headers: {
            google_token: credential,
          },
        });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        this.isLogin = true;
        this.router.push("/");
        Swal.fire(
          "Signing in success",
          `Welcome to Zara, ${data.username}!`,
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Signing in failed",
          text: "Please try again!",
          confirmButtonText: "Try Again",
        });
      }
    },
    async QRToken(id) {
      console.log("ini harusnya tampil code");
      try {
        let { data } = await axios({
          method: `GET`,
          url: `https://api.happi.dev/v1/qrcode?data=${baseUrl}/pub/products/${id}`,
          headers: {
            "x-happi-key": `1ab82a0r74fs3BzZQLDmQhEjxIw70l4mXKk6e5ZvozJGklui9XpJ9FPx`,
          },
        });
        console.log(data, "ini data qr code");
        this.QRCode = data.qrcode;
        console.log(this.QRCode);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
