export class ToastProvider {
  constructor(
    private _callback: {(options: ToastOptions): void}
  ) {}
  
  show(options: ToastOptions) {
    this._callback(options);
  }
}

export interface ToastOptions {
  type?: "info" | "danger" | "success";
  icon?: string;
  innerHtml: string;
  timeout?: number;
}