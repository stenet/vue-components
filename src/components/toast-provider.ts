export class ToastProvider {
  constructor(
    private _showCallback: {(options: ToastOptions): void},
    private _clearAllCallback: {(): void}
  ) {}
  
  show(options: ToastOptions) {
    this._showCallback(options);
  }
  clearAll() {
    this._clearAllCallback();
  }
}

export interface ToastOptions {
  type?: "info" | "danger" | "success";
  icon?: string;
  innerHtml: string;
  timeout?: number;
}