const router = require("express").Router();
const authentication = require("../middleware/authentication");
const Controller = require("../controllers/controller");
const UserController = require("../controllers/usercontroller");
const {
  authorization,
  authorizationStatus,
  authorizationWishlist,
} = require("../middleware/authorization");
const CustomController = require("../controllers/customerController");

router.get("/pub/products", CustomController.allProduct);
router.get("/pub/products/:id", CustomController.getProductById);

router.post("/pub/register", CustomController.register);
router.post("/pub/login", CustomController.login);
router.post("/pub/login-google", CustomController.googleLogIn);

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login-google", UserController.googleLogIn);

router.get("/home", Controller.home);
router.use(authentication);
router.post(
  "/pub/wishlist/:id",
  authorizationWishlist,
  CustomController.wishListProduct
);
router.get(
  "/pub/wishlist",
  authorizationWishlist,
  CustomController.readWishlist
);
router.get("/products", Controller.readAll);
router.post("/products", Controller.addProduct);
router.get("/products/:id", Controller.getProductById);
router.delete("/products/:id", authorization, Controller.deleteData);
router.put("/products/:id", authorization, Controller.updateProduct);
router.patch("/products/:id", authorizationStatus, Controller.statusProduct);

router.get("/history", Controller.readHistory);

router.get("/categories", Controller.getAllCategory);
router.post("/categories", Controller.addCategory);
router.get("/categories/:id", Controller.getCategoryById);
router.delete("/categories/:id", Controller.deleteTabel);

module.exports = router;
