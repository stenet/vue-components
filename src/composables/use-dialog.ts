import { inject } from "vue";
import { DialogProvider } from "@/components/DialogProvider";

export function useDialog() {
  const dialogProvider: DialogProvider | undefined = inject(DialogProvider.name);
  if (!dialogProvider) {
    throw new Error("DialogProvider not registered");
  }
  
  return dialogProvider;
}