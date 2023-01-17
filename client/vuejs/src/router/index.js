import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DetailProduct from "../views/DetailProduct.vue";
import WishList from "../views/WishList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/wishlist",
      name: "Wishlist",
      component: WishList,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/products/:productId",
      name: "ProductDetail",
      component: DetailProduct,
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to.name, "<<<");
  if (to.name === "Login" && localStorage.getItem("access_token")) {
    next("/");
  } else if (to.name === "Wishlist" && !localStorage.getItem("access_token")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
