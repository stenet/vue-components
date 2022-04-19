import { replaceStringDatesWithDate } from "@/services/object-date-handler";

export function createRequest(options: RequestCreateOptions): RequestInstance {
  return new RequestInstance(options);
}

export class RequestInstance {
  constructor(
    private _options: RequestCreateOptions
  ) {}

  get<T>(url: string, config?: RequestConfig) {
    const o = Object.assign({}, config, <RequestConfigAll>{
      method: "GET",
      url: url
    });

    return this.fetchInternal<T>(o);
  }
  post<T>(url: string, data: T | any, config?: RequestConfig) {
    const o = Object.assign(<Partial<RequestConfigAll>>{
      dataType: "json",
    }, config, <RequestConfigAll>{
      method: "POST",
      url: url,
      data: data
    });

    return this.fetchInternal<T>(o);
  }
  put<T>(url: string, data: T, config?: RequestConfig) {
    const o = Object.assign(<Partial<RequestConfigAll>>{
      dataType: "json",
    }, config, <RequestConfigAll>{
      method: "PUT",
      url: url,
      data: data
    });

    return this.fetchInternal<T>(o);
  }
  patch<T>(url: string, data: T, config?: RequestConfig) {
    const o = Object.assign(<Partial<RequestConfigAll>>{
      dataType: "json",
    }, config, <RequestConfigAll>{
      method: "PATCH",
      url: url,
      data: data
    });

    return this.fetchInternal<T>(o);
  }
  delete<T>(url: string, config?: RequestConfig) {
    const o = Object.assign({}, config, <RequestConfigAll>{
      method: "DELETE",
      url: url
    });

    return this.fetchInternal<T>(o);
  }

  getUrl(url: string, params?: Record<string, string>) {
    let baseUrl = this._options.baseUrl;
    if (baseUrl?.endsWith("/")) {
      baseUrl = baseUrl.substr(0, baseUrl.length);
    }

    if (url.startsWith("/")) {
      url = url.substr(1);
    }

    return `${baseUrl}/${url}`;
  }

  private async fetchInternal<T>(options: RequestConfigAll): Promise<RequestResponse<T>> {
    const { abortController, finalizeAbort } = this.createAbortHandler(options.timeout, options.abortSignal);

    const result = await fetch(this.getUrl(options.url, options.params), {
      method: options.method,
      credentials: this.withCredentials(options.withCredentials),
      headers: this.getHeaders(options.dataType!, options.headers),
      signal: abortController.signal,
      body: options.data
        ? ((typeof options.data === "string" || options.dataType != "json")
          ? options.data
          : JSON.stringify(options.data))
        : undefined
    });

    finalizeAbort();

    await this.validateStatus(result, options.validateStatus)

    return {
      data: await this.getData(result, options.responseType),
      status: result.status,
      statusText: result.statusText
    }
  }

  private createAbortHandler(timeout?: number, abortSignal?: AbortSignal) {
    let abortController = new AbortController();
    const abort = (() => {
      abortController.abort();
    });

    if (abortSignal) {
      abortSignal.addEventListener("abort", abort);
    }

    const handle = timeout
      ? setTimeout(() => abortController.abort(), timeout)
      : 0;

    return {
      abortController,
      finalizeAbort: () => {
        if (abortSignal) {
          abortSignal.removeEventListener("abort", abort);
        }

        clearTimeout(handle);
      }
    };
  }
  private withCredentials(withCredentials?: boolean): RequestCredentials {
    return (withCredentials ??= this._options.withCredentials ??= true)
      ? "include"
      : "omit";
  }
  private getHeaders(dataType: DataType, headers?: Record<string, string>): Record<string, string> {
    headers ||= {};

    if (!headers["Content-Type"]) {
      const contentType = this.getContentType(dataType);
      if (contentType) {
        headers["Content-Type"] = contentType;
      }
    }

    return headers;
  }
  private getContentType(dataType: DataType) {
    switch (dataType) {
      case "json": {
        return "application/json";
      }
      default: {
        return null;
      }
    }
  }
  private async validateStatus(response: Response, validateStatus?: boolean) {
    validateStatus ??= this._options.validateStatus ??= true;

    if (!validateStatus) {
      return;
    }

    if (response.status < 200 || response.status > 299) {
      if (response.status === 409) {
        const text = await response.text();
        throw new RequestConflictException(text);
      } else {
        throw new RequestException(response.status, response.statusText)
      }

      throw new Error(`StatusErr ${response.status}`);
    }
  }

  private async getData<T>(response: Response, responseType?: ResponseType) {
    responseType ||= "json";

    if (responseType === "blob") {
      const blob = await response.blob();
      return blob;
    }

    const text = await response.text();
    if (!text) {
      return null;
    }

    if (responseType === "text") {
      return text;
    }

    const obj = JSON.parse(text);
    return replaceStringDatesWithDate(obj);
  }
}

export class RequestConflictException {
  constructor(
    public text: string
  ) {}
}
export class RequestException {
  constructor(
    public statusCode: number,
    public statusText: string
  ) {}
}

export interface RequestCreateOptions {
  baseUrl: string;
  validateStatus?: boolean;
  withCredentials?: boolean;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  dataType?: DataType;
  responseType?: ResponseType;
  abortSignal?: AbortSignal;
  timeout?: number;
  validateStatus?: boolean;
  withCredentials?: boolean;
}

interface RequestConfigAll extends RequestConfig{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data: any;
}

export interface RequestResponse<T> {
  status: number;
  statusText: string;

  data: T;
}

type DataType = "json" | "form";
type ResponseType = "json" | "blob" | "text";