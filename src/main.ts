import { createDevExpressPlugin } from "@/plugins/devextreme";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "normalize.css/normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "devextreme/dist/css/dx.light.css";
import "./colors.less";
import "./common.less";

import "./main.less";

const app = createApp(App);

app
  .use(router)
  .use(createDevExpressPlugin({}));

app.mount("#app");
