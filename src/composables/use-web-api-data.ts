import { useDataSavedEventBus } from "./use-data-saved-event";
import { useLoadingInfo } from "./use-loading-info";
import type { RequestInstance } from "@/services/request-factory";
import type { GetOptions } from "@/services/web-api-request";
import { webApiDelete, webApiGet, webApiPost } from "@/services/web-api-request";
import type { Ref } from "vue";
import { computed, ref, unref, watch } from "vue";

export function useWebApiData<T>(options: WebApiDataCreateOptions) {
  const { eventBus: dataSavedEventBus } = useDataSavedEventBus();

  const isLoading = ref<boolean>(false);
  const isLoaded = ref<boolean>(false);
  const isSaving = ref<boolean>(false);
  const isDeleting = ref<boolean>(false);
  const isWorking = computed(() => isLoading.value || isSaving.value || isDeleting.value);

  const hasError = ref<boolean>(false);
  const error = ref<string | null>(null);
  const data = ref<Partial<T>>({});

  const loadingInfo = options.updateLoadingInfo
    ? useLoadingInfo()
    : null;

  watch(() => unref(options.id), () => loadItem());

  const loadItem = async () => {
    await runAsync(isLoading, async () => {
      try {
        loadingInfo?.beginLoading();

        data.value = <any>await webApiGet<T>({
          url: options.url,
          request: options.request,
          getOptions: options.getOptions,
          id: unref(options.id)
        });

        isLoaded.value = true;
      } catch (ex) {
        loadingInfo?.errorOccured();
        throw ex;
      } finally {
        loadingInfo?.endLoading();
      }
    });
  };
  const saveItem = async () => {
    if (!data.value) {
      throw new Error("Data not set");
    }

    await runAsync(isSaving, async () => {
      loadingInfo?.beginSaving();

      try {
        data.value = <any>await webApiPost<T>({
          url: options.url,
          request: options.request,
          getOptions: options.getOptions,
          data: data.value
        });

        dataSavedEventBus.emit({
          url: options.url
        });
      } catch (ex) {
        loadingInfo?.errorOccured();
        throw ex;
      } finally {
        loadingInfo?.endSaving();
      }
    });
  };
  const deleteItem = async () => {
    await runAsync(isSaving, async () => {
      loadingInfo?.beginSaving();

      try {
        await webApiDelete<T>({
          url: options.url,
          request: options.request,
          id: unref(options.id)
        });

        data.value = null;
        isLoaded.value = false;

        dataSavedEventBus.emit({
          url: options.url
        });
      } catch (ex) {
        loadingInfo?.errorOccured();
        throw ex;
      } finally {
        loadingInfo?.endSaving();
      }
    });
  };

  const runAsync = async (ref: Ref<boolean>, callback: { (): Promise<void> }) => {
    if (!hasId()) {
      return;
    }
    if (ref.value) {
      return;
    }

    try {
      ref.value = true;
      await callback();
    } finally {
      ref.value = false;
    }
  };
  const hasId = () => unref(options.id) != void (0);

  if (hasId()) {
    loadItem();
  }

  return <WebApiDataResult<T>>{
    options,
    isLoading,
    isLoaded,
    isSaving,
    isDeleting,
    isWorking,
    hasError,
    error,
    loadItem,
    saveItem,
    deleteItem,
    data
  };
}
export function useWebApiDataAsRef<T>(options: WebApiDataCreateOptions) {
  return ref(useWebApiData<T>(options));
}

export interface WebApiDataCreateOptions {
  request: RequestInstance;
  url: string;
  id: Ref<string> | string;
  getOptions?: GetOptions;
  updateLoadingInfo?: boolean;
}

export interface WebApiDataResult<T> {
  options: WebApiDataCreateOptions;
  isLoading: Ref<boolean>;
  isLoaded: Ref<boolean>;
  isSaving: Ref<boolean>;
  isDeleting: Ref<boolean>;
  isWorking: Ref<boolean>;
  hasError: Ref<boolean>;
  error: Ref<string | null>;
  loadItem: () => Promise<void>;
  saveItem: () => Promise<void>;
  deleteItem: () => Promise<void>;
  data: Ref<Partial<T>>;
}