import { DxColorBox } from "devextreme-vue/color-box";
import { DxButton } from "devextreme-vue/button";
import { DxCheckBox } from "devextreme-vue/check-box";
import { DxColumn, DxDataGrid, DxMasterDetail, DxSelection } from "devextreme-vue/data-grid";
import { DxButton as DxDateBoxButton, DxDateBox } from "devextreme-vue/date-box";
import { DxButton as DxNumberBoxButton, DxNumberBox } from "devextreme-vue/number-box";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxButton as DxTextBoxButton, DxTextBox } from "devextreme-vue/text-box";
import { DxScrollView } from "devextreme-vue/ui/scroll-view";
import { DxValidationGroup } from "devextreme-vue/validation-group";
import { DxCustomRule, DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import type { App, Plugin } from "vue";
import { locale } from "devextreme/localization";

const DX_INITIALIZED_EVENT = "dx-initialized";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dx: DevExpressGlobalProperty;
  }
}

export function getDefaultDxWidgets(): DevExpressWidget[] {
  return [
    { name: "DxButton", vueComponent: DxButton },
    { name: "DxDataGrid", vueComponent: DxDataGrid },
    { name: "DxColumn", vueComponent: DxColumn },
    { name: "DxMasterDetail", vueComponent: DxMasterDetail },
    { name: "DxSelection", vueComponent: DxSelection },
    { name: "DxTextBox", vueComponent: DxTextBox },
    { name: "DxTextBoxButton", vueComponent: DxTextBoxButton },
    { name: "DxNumberBox", vueComponent: DxNumberBox },
    { name: "DxNumberBoxButton", vueComponent: DxNumberBoxButton },
    { name: "DxDateBox", vueComponent: DxDateBox },
    { name: "DxDateBoxButton", vueComponent: DxDateBoxButton },
    { name: "DxCheckBox", vueComponent: DxCheckBox },
    { name: "DxColorBox", vueComponent: DxColorBox },
    { name: "DxSelectBox", vueComponent: DxSelectBox },
    { name: "DxScrollView", vueComponent: DxScrollView },
    { name: "DxValidationGroup", vueComponent: DxValidationGroup },
    { name: "DxValidator", vueComponent: DxValidator },
    { name: "DxRequiredRule", vueComponent: DxRequiredRule },
    { name: "DxStringLengthRule", vueComponent: DxStringLengthRule },
    { name: "DxCustomRule", vueComponent: DxCustomRule },
    { name: "DxEmailRule", vueComponent: DxEmailRule }
  ];
}

export function createDevExpressPlugin(options: DevExpressOptions): Plugin {
  return {
    install(app: App) {
      locale(options.locale);
      
      const widgets = options.widgets || getDefaultDxWidgets();
      widgets.forEach(w => registerWidget(app, w));

      app.config.globalProperties.$dx = <DevExpressGlobalProperty>{
        dataGrid: {
          webApiRemoteOperations: {
            filtering: true,
            paging: true,
            sorting: true,
            summary: true
          },
          filterRow: {
            visible: true
          }
        }
      };
    }
  };
}

export function registerDxInitialized<T>(el: Element, callback: { (args: DxInitialized<T>): void }) {
  el.addEventListener(DX_INITIALIZED_EVENT, (args: any) => {
    callback(args.detail);
  });
}

function registerWidget(app: App, widget: DevExpressWidget) {
  const methods = widget.vueComponent.extends?.methods;
  const hasIntegrationOptions = !!methods?.$_getExtraIntegrationOptions;

  if (hasIntegrationOptions) {
    const currentExtraIntegrationOptions = methods.$_getExtraIntegrationOptions;

    methods.$_getExtraIntegrationOptions = () => {
      return Object.assign(currentExtraIntegrationOptions(), {
        onInitialized(ev: DxInitialized<any>) {
          ev.element.dispatchEvent(new CustomEvent(DX_INITIALIZED_EVENT, {
            detail: ev,
            bubbles: true,
            cancelable: false
          }));
        }
      });
    };
  }

  app.component(widget.name, widget.vueComponent);
}

export type DxInitialized<T> = {
  element: HTMLElement,
  component: T
};

type DevExpressOptions = {
  locale: string;
  widgets?: DevExpressWidget[];
}

type DevExpressWidget = {
  name: string;
  vueComponent: any;
}

type DevExpressGlobalProperty = {
  dataGrid: {
    webApiRemoteOperations: Record<string, boolean>;
    filterRow: any;
  };
}