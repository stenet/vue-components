import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "normalize.css/normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./main.less";
import "./common.less";

const app = createApp(App);

app.use(router);

app.mount("#app");
