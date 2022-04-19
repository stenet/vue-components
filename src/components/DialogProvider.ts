export class DialogProvider {
  constructor(
    private _callback: {(options: DialogFullOptions): void}
  ) {}

  show(options: DialogFullOptions) {
    if (!options.buttons?.length) {
      throw new Error("No buttons defined");
    }
    
    this._callback(options);
  }
  showYesNo(options: DialogOptions): Promise<"yes" | "no"> {
    return new Promise((resolve) => {
      this.show({
        ...options,
        buttons: [{
          text: "Yes",
          onClick: () => {
            resolve("yes");
          }
        }, {
          text: "No",
          onClick: () => {
            resolve("no");
          }
        }]
      })
    });
  }
  showYesNoCancel(options: DialogOptions): Promise<"yes" | "no" | "cancel"> {
    return new Promise((resolve) => {
      this.show({
        ...options,
        buttons: [{
          text: "Yes",
          onClick: () => {
            resolve("yes");
          }
        }, {
          text: "No",
          onClick: () => {
            resolve("no");
          }
        }, {
          text: "Cancel",
          onClick: () => {
            resolve("cancel");
          }
        }]
      })
    });
  }
}

export interface DialogOptions {
  type?: "info" | "danger" | "success";
  icon?: string | null;
  innerHtml: string;
}
export interface DialogFullOptions extends DialogOptions {
  buttons: DialogButton[];
}
export interface DialogButton {
  type?: "default" | "info" | "danger" | "success";
  icon?: string;
  text: string;
  onClick(): void | Promise<any>;
}