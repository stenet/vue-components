import { createDevExpressPlugin } from "@/plugins/devextreme";
import { createGlobalizationPlugin } from "@/plugins/globalization";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "devextreme/dist/css/dx.light.css";
import "./colors.less";
import "./common.less";

import "./main.less";

import de from "./de.json";
import messagesDe from "./messages/de.json";

const app = createApp(App);

app
  .use(router)
  .use(createDevExpressPlugin({}))
  .use(createGlobalizationPlugin())
  .use(createI18n({
    locale: "de",
    fallbackLocale: "de",
    messages: {
      de: {
        ...de,
        ...messagesDe
      }
    }
  }));

app.mount("#app");
