<script>
export default {
  data() {
    return {
      register: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  props: ["loginGoogle"],
  emits: ["signUp", "logIn"],
  methods: {
    signUp() {
      this.$emit("signUp", this.register);
      this.register.username = "";
      this.register.email = "";
      this.register.password = "";
      this.register.phoneNumber = "";
      this.register.address = "";
    },
    logInHandler() {
      this.$emit("logIn", this.dataLogin);
      this.dataLogin.email = "";
      this.dataLogin.password = "";
    },
  },
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex flex row g-0">
      <div class="col-md-6 mt-3">
        <div class="card card1 p-3">
          <div class="d-flex flex-column">
            <img
              src="https://logosmarcas.net/wp-content/uploads/2020/05/Zara-Logo-650x366.png"
              height="50"
              width="50"
            />
          </div>
          <form @submit.prevent="signUp()">
            <label class="login mt-3">Sign up</label>
            <div class="input-field d-flex flex-column mt-3">
              <label for="register-username">Username</label>
              <input
                v-model="register.username"
                type="username"
                class="form-control"
                id="register-username"
                placeholder="username example"
                autocomplete="off"
                required
              />
              <label for="register-email">Email</label>
              <input
                v-model="register.email"
                type="email"
                class="form-control"
                id="login-email"
                placeholder="email@example.com"
                autocomplete="off"
                required
              />
              <label for="register-password">Password</label>
              <input
                v-model="register.password"
                type="password"
                class="form-control"
                id="login-password"
                placeholder="Enter your password ..."
                autocomplete="off"
                required
              />
              <label for="register-phone">Phone Number </label>
              <input
                v-model="register.phoneNumber"
                type="number"
                class="form-control"
                id="register-phone"
                placeholder="08136262832"
                autocomplete="off"
                required
              />
              <label for="register-address">Address</label>
              <input
                v-model="register.address"
                type="address"
                class="form-control"
                id="register-address"
                placeholder="jakarta"
                autocomplete="off"
                required
              />
              <button
                class="mt-4 btn btn-dark d-flex justify-content-center align-items-center"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card card2 p-3">
          <div class="d-flex flex-column">
            <img
              src="https://logosmarcas.net/wp-content/uploads/2020/05/Zara-Logo-650x366.png"
              height="50"
              width="50"
            />
          </div>
          <form @submit.prevent="logInHandler()">
            <label class="login mt-3">Log In</label>
            <div class="input-field d-flex flex-column mt-3">
              <label for="login-email">Email</label>
              <input
                v-model="dataLogin.email"
                type="email"
                class="form-control"
                id="login-email"
                placeholder="email@example.com"
                autocomplete="off"
                required
              />
              <label for="login-password">Password</label>
              <input
                v-model="dataLogin.password"
                type="password"
                class="form-control"
                id="login-password"
                placeholder="Enter your password ..."
                autocomplete="off"
                required
              />
              <button
                class="mt-4 btn btn-dark d-flex justify-content-center align-items-center"
              >
                Login
              </button>
              <div class="py-2" :id="loginGoogle"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
