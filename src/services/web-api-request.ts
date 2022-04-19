import type { RequestConfig, RequestInstance } from "@/services/request-factory";

export async function webApiGet<T>(options: RestGetOptions) {
  const config: RequestConfig = {};

  config.headers = createHeaders(options);

  const r = await options.request.get<T>(
    getUrl(options.url, options.id),
    Object.assign(<Partial<RequestConfig>>{}, options.config, config)
  );

  return r.data;
}

export async function webApiPost<T>(options: RestPostOptions) {
  const config: RequestConfig = {};

  config.headers = createHeaders(options);

  const r = await options.request.post<T>(
    getUrl(options.url),
    options.data,
    Object.assign(<Partial<RequestConfig>>{}, options.config, config)
  );

  return r.data;
}
export async function webApiPut<T>(options: RestPostOptions) {
  const config: RequestConfig = {};

  config.headers = createHeaders(options);

  const r = await options.request.put<T>(
    getUrl(options.url),
    options.data,
    Object.assign(<Partial<RequestConfig>>{}, options.config, config)
  );

  return r.data;
}
export async function webApiDelete<T>(options: RestDeleteOptions) {
  const config: RequestConfig = {};

  config.headers = createHeaders(options);

  const r = await options.request.delete<T>(
    getUrl(`${options.url}/${options.id}`),
    Object.assign(<Partial<RequestConfig>>{}, options.config, config)
  );

  return r.data;
}

function getUrl(url: string, id?: string) {
  url = `data/${url}`;

  if (id != void(0)) {
    url += `/${id}`;
  }

  return url;
}
function createHeaders(options?: RestGetOptions | RestDeleteOptions) {
  const headers: Record<string, string> = {};

  if (options && "getOptions" in options && options.getOptions) {
    headers["X-GET-OPTIONS"] = JSON.stringify(options.getOptions);
  }

  return headers;
}

interface RestOptions {
  request: RequestInstance;
  url: string;

  config?: RequestConfig;
}

export interface RestDeleteOptions extends RestOptions {
  id: any;
}

export interface RestGetOptions extends RestOptions {
  getOptions?: GetOptions;
  id?: any;
}

export interface RestPostOptions extends RestOptions {
  getOptions?: GetOptions;
  data: any;
}

export interface GetOptions {
  columns?: string[];
  where?: any[];
  totalSummary?: { selector: string; summaryType: string }[];
  orderBy?: { columnName: string; sortOrder: number }[];
  skip?: number;
  take?: number;
  selectDeleted?: boolean;
  requireTotalCount?: boolean;
  distinct?: boolean;
  changedSince?: Date;
  customs?: GetOptionsCustom[];
  searchtext?: string;
  maxRecords?: number;
  includeValidationRules?: boolean;
  expand?: Record<string, GetOptions | null>;
}

export interface GetOptionsCustom {
  key: string;
  value: any;
}