import { LoadingInfo } from "./loading-info";
import { inject, provide, ref } from "vue";

export function useLoadingInfo() {
  let loadingInfo = inject<LoadingInfo | undefined>(LoadingInfo.name, undefined);
  if (loadingInfo) {
    return loadingInfo;

  }

  const refLoadingInfo = ref(new LoadingInfo());
  provide(LoadingInfo.name, refLoadingInfo.value);
  return refLoadingInfo.value;
}