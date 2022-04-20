import { createDevExpressPlugin } from "@/plugins/devextreme";
import { createGlobalizationPlugin, DefaultDateTimeFormats, DefaultNumberFormats } from "@/plugins/globalization";
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
const locale = "de";

app
  .use(router)
  .use(createDevExpressPlugin({
    locale: locale
  }))
  .use(createGlobalizationPlugin({
    locale: locale
  }))
  .use(createI18n({
    locale: locale,
    fallbackLocale: "de",
    datetimeFormats: {
      de: DefaultDateTimeFormats
    },
    numberFormats: {
      de: DefaultNumberFormats
    },
    messages: {
      de: {
        ...de,
        ...messagesDe
      }
    }
  }));

app.mount("#app");
