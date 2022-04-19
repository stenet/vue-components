import { useEventBus } from "@vueuse/core";

export function useDataSavedEventBus() {
  const eventBus = useEventBus<DataSavedEvent>("data:saved");

  return {
    eventBus
  }
}

interface DataSavedEvent {
  url: string;
}