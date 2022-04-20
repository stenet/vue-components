import { LoadingBarProvider } from "@/components/loading-bar-provider";
import { inject, provide, ref } from "vue";

export function useLoadingBar() {
  let loadingBarProvider = inject<LoadingBarProvider | undefined>(LoadingBarProvider.name, undefined);
  if (loadingBarProvider) {
    return loadingBarProvider;

  }

  const refLoadingInfo = ref(new LoadingBarProvider());
  provide(LoadingBarProvider.name, refLoadingInfo.value);
  return refLoadingInfo.value;
}