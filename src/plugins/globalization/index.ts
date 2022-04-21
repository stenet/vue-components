import type { App, Plugin } from "vue";
import {
  getDateTimeFormat,
  getDateTimeFormatter,
  getDateTimeFormatterParser,
  getNumberFormat,
  getNumberFormatter,
  getNumberFormatterParser
} from "@/plugins/globalization/services/globalization";

export * from "./services/globalization";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    // Formatiert ein Datum
    $datF(value: Date | undefined | null, formatStr: string): any;

    // Liefert das Datumsformat bzw. Formatter/Parser für display-format für DxDateBox (d, D, g, G, t, T, ...)
    $datFP(formatStr: string): any;

    // Formatiert eine Nummer
    $numF(value: Number | null | undefined, formatStr: string): any;

    // Liefert das Nummernformat bzw. Formatter/Parser für format für DxNumberBox (n*, p*, c*, f*)
    $numFP(formatStr: string): any;
  }
}

export function createGlobalizationPlugin(options: GlobalizationOptions): Plugin {
  return {
    install(app: App) {
      app.config.globalProperties.$datF = (value: Date | undefined | null, formatStr: string) => {
        return getDateTimeFormatter(
          options.locale,
          formatStr
        )(value);
      };

      app.config.globalProperties.$datFP = (formatStr: string) => {
        return getDateTimeFormatterParser(
          options.locale,
          formatStr
        );
      };

      app.config.globalProperties.$numF = (value: Number | null | undefined, formatStr: string) => {
        return getNumberFormatter(
          options.locale,
          formatStr
        )(value);
      };

      app.config.globalProperties.$numFP = (formatStr: string) => {
        return getNumberFormat(
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