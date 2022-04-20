import type { App, Plugin } from "vue";
import {
  getDateTimeFormatter,
  getDateTimeFormatterParser,
  getDateTimeParser, getNumberFormatter, getNumberFormatterParser, getNumberParser
} from "@/plugins/globalization/services/globalization";
export * from "./services/globalization";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dtF(formatStr: string): any;
    $dtP(formatStr: string): any;
    $dtFP(formatStr: string): any;
    $numF(formatStr: string): any;
    $numP(formatStr: string): any;
    $numFP(formatStr: string): any;
  }
}

export function createGlobalizationPlugin(options: GlobalizationOptions): Plugin {
  return {
    install(app: App) {
      app.config.globalProperties.$dtF = (formatStr: string) => {
        return getDateTimeFormatter(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$dtP = (formatStr: string) => {
        return getDateTimeParser(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$dtFP = (formatStr: string) => {
        return getDateTimeFormatterParser(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$numF = (formatStr: string) => {
        return getNumberFormatter(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$numP = (formatStr: string) => {
        return getNumberParser(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$numFP = (formatStr: string) => {
        return getNumberFormatterParser(
          options.locale,
          formatStr
        );
      };
    }
  };
}
export type GlobalizationOptions = {
  locale: string;
}