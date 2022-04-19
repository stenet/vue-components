import { inject } from "vue";
import { ToastProvider } from "@/components/toast-provider";

export function useToast() {
  const toastProvider: ToastProvider | undefined = inject(ToastProvider.name);
  if (!toastProvider) {
    throw new Error("ToastProvider not registered");
  }
  
  return toastProvider;
}