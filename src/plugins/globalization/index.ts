import type { App, Plugin } from "vue";
import { format, getFormatter, getParser, getFormatterParser } from "./services/globalization";
export * from "./services/globalization";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $globalization: IGlobalizationGlobalProperty;
  }
}

export function createGlobalizationPlugin(): Plugin {
  return {
    install(app: App) {
      app.config.globalProperties.$globalization = <IGlobalizationGlobalProperty>{
        format,
        getFormatter,
        getParser,
        getFormatterParser
      };
    }
  };
}

interface IGlobalizationGlobalProperty {
  format(value: any, formatStr: string): string;

  getFormatter(formatStr: string): any;

  getParser(formatStr: string): any;

  getFormatterParser(formatStr: string): any;
}