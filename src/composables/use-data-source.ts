import { useLoadingBar } from "@/composables/use-loading-bar";
import { useDataSavedEventBus } from "./use-data-saved-event";
import type { RequestInstance } from "@/services/request-factory";
import { webApiDelete, webApiGet, webApiPost } from "@/services/web-api-request";
import type { GetOptions } from "@/services/web-api-request";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { onUnmounted } from "vue";

export function useDataSource<T>(options: DataSourceCreateOptions<T>) {
  const dataSource = new DataSource(
    createDataStore<T>(options)
  );

  dataSource.requireTotalCount(true);
  
  onUnmounted(() => {
    dataSource.dispose();
  });

  const { eventBus } = useDataSavedEventBus();
  eventBus.on(ev => {
    if (ev.url === options.url) {
      dataSource.reload();
    }
  });

  return dataSource;
}

function createDataStore<T>(options: DataSourceCreateOptions<T>) {
  let initialLoadingDone = false;

  const loadingBarProvider = options.updateLoadingInfo
    ? useLoadingBar()
    : null;

  return new CustomStore({
    key: options.keyProperty,
    byKey: async (key) => {
      if (options.canLoad) {
        if (!await options.canLoad(options)) {
          return null;
        }
      }

      return webApiGet({
        url: `${options.url}/${key}`,
        request: options.request,
        getOptions: createGetOptions(options)
      });
    },
    load: async (loadOptions) => {
      if (!initialLoadingDone) {
        initialLoadingDone = true;

        if (options.onInitialDataLoading) {
          await options.onInitialDataLoading();
        }
      }

      if (options.canLoad) {
        if (!await options.canLoad(options)) {
          if (loadOptions.requireTotalCount) {
            return {
              data: [],
              totalCount: 0
            };
          } else {
            return [];
          }
        }
      }

      loadingBarProvider?.beginLoading();

      try {
        const getOptions = getLoadGetOptions(options, loadOptions);

        if (options.onDataLoading) {
          await options.onDataLoading(getOptions);
        }

        const r: any = await webApiGet({
          url: options.url,
          request: options.request,
          getOptions: getOptions
        });

        const dataField: string = (<any>loadOptions).dataField;
        if (dataField) {
          if (dataField.includes(".")) {
            const tokens = dataField.split(".");

            r.forEach((i: any) => {
              let value = i;
              tokens.forEach((token, index) => {
                if (index + 1 === tokens.length) {
                  value[token] = i[dataField];
                } else {
                  value[token] = {};
                  value = value[token];
                }
              });
            });
          }
        }

        if (getOptions.requireTotalCount || getOptions.totalSummary) {
          const result: LoadResult<T> = {
            data: r.rows
          };

          if (getOptions.requireTotalCount) {
            result.totalCount = r.count;
          }
          if (getOptions.totalSummary) {
            result.summary = r.summary;
          }

          if (options.onDataLoaded) {
            await options.onDataLoaded(result);
          }

          return result;
        } else {
          const result = Array.isArray(r)
            ? r
            : r.rows;

          if (options.onDataLoaded) {
            await options.onDataLoaded({
              data: result
            });
          }

          return result;
        }
      } catch (ex) {
        loadingBarProvider?.errorOccured();
        throw ex;
      } finally {
        loadingBarProvider?.endLoading();
      }
    },
    insert: async (values) => {
      loadingBarProvider?.beginSaving();

      try {
        return await webApiPost({
          url: options.url,
          request: options.request,
          getOptions: createGetOptions(options),
          data: values
        });
      } catch (ex) {
        loadingBarProvider?.errorOccured();
        throw ex;
      } finally {
        loadingBarProvider?.endSaving();
      }
    },
    update: async (key, values) => {
      loadingBarProvider?.beginSaving();

      try {
        const data = Object.assign(values);
        data[options.keyProperty] = key;

        return await webApiPost({
          url: options.url,
          request: options.request,
          getOptions: options.getOptions,
          data
        });
      } catch (ex) {
        loadingBarProvider?.errorOccured();
        throw ex;
      } finally {
        loadingBarProvider?.endSaving();
      }
    },
    remove: async (key) => {
      loadingBarProvider?.beginSaving();

      try {
        return await webApiDelete({
          url: options.url,
          request: options.request,
          id: key
        });
      } catch (ex) {
        loadingBarProvider?.errorOccured();
        throw ex;
      } finally {
        loadingBarProvider?.endSaving();
      }
    }
  });
}

function createGetOptions<T>(options: DataSourceCreateOptions<T>) {
  //TODO irgendwann durch structuredClone ersetzen (ist noch zu neu)
  const getOptions: GetOptions = options.getOptions
    ? JSON.parse(JSON.stringify(options.getOptions))
    : {};

  return getOptions;
}
function getLoadGetOptions<T>(options: DataSourceCreateOptions<T>, loadOptions: any) {
  const getOptions = createGetOptions(options);

  if (loadOptions.filter) {
    getOptions.where = getOptions.where
      ? [getOptions.where, loadOptions.filter]
      : loadOptions.filter;
  }

  const hasSearchExpr = loadOptions.searchExpr
    && loadOptions.searchOperation
    && loadOptions.searchValue;

  if (hasSearchExpr) {
    if (options.searchtextEnabled) {
      getOptions.searchtext = loadOptions.searchValue;
    } else {
      const where = Array.isArray(loadOptions.searchExpr)
        ? toOr(loadOptions.searchExpr.map((s: string) => [s, loadOptions.searchOperation, loadOptions.searchValue]))
        : [loadOptions.searchExpr, loadOptions.searchOperation, loadOptions.searchValue];

      getOptions.where = getOptions.where
        ? [where, getOptions.where]
        : where;
    }
  }

  getOptions.skip = loadOptions.skip;
  getOptions.take = loadOptions.take;
  getOptions.requireTotalCount = loadOptions.requireTotalCount;

  if (loadOptions.totalSummary) {
    getOptions.totalSummary = loadOptions.totalSummary;
  }

  if (loadOptions.sort) {
    getOptions.orderBy = (<any[]>loadOptions.sort).map((s) => {
      return {
        columnName: s.selector,
        sortOrder: (s.desc === true ? 1 : 0)
      };
    });
  }

  const dataField: string = (<any>loadOptions).dataField;
  if (dataField) {
    delete getOptions.skip;
    delete getOptions.take;
    delete getOptions.expand;
    delete getOptions.requireTotalCount;
    delete getOptions.totalSummary;

    getOptions.columns = [dataField];
    getOptions.orderBy = [{ columnName: dataField, sortOrder: 0 }];
    getOptions.distinct = true;
  }

  return getOptions;
}
function toOr(where: any[]) {
  const r = [];

  for (const item of where) {
    if (r.length > 0) {
      r.push("or");
    }

    r.push(item);
  }

  return r;
}

export interface DataSourceCreateOptions<T> {
  request: RequestInstance;
  url: string;
  getOptions?: GetOptions;
  searchtextEnabled?: boolean;
  updateLoadingInfo?: boolean;

  keyProperty: string;

  canLoad?(options: DataSourceCreateOptions<T>): Promise<boolean> | boolean;

  onInitialDataLoading?(): Promise<void>;

  onDataLoading?(getOptions: GetOptions): Promise<void> | void;

  onDataLoaded?(result: LoadResult<T>): Promise<void> | void;
}

interface LoadResult<T> {
  data: T[];
  totalCount?: number;
  summary?: any;
};