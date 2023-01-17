import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import vue3GoogleLogin from "vue3-google-login";


import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);
app.use(vue3GoogleLogin, {
  clientId:
    "905910788791-uv56a008snkjr087jm7ml62ii5ljck2i.apps.googleusercontent.com",
});

app.mount("#app");
