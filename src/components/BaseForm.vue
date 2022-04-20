<script lang="ts" setup>
import type BaseFormExpose from "@/components/BaseFormExpose";
import { useToast } from "@/composables/use-toast";
import type { DxValidationGroup } from "devextreme-vue/validation-group";
import { ref } from "vue";

const emits = defineEmits<{
  (e: "submit", v: null): void
}>();

const validationGroup = ref<DxValidationGroup>();
const toast = useToast();

const onSubmit = (ev: SubmitEvent) => {
  emits("submit", null);
};

const validate = async (showMessage = true) => {
  const result = validationGroup.value!.instance!.validate();
  await result.complete;

  toast.clearAll();  
  if (result.isValid) {
    return true;
  }

  if (showMessage && result.brokenRules && result.brokenRules.length > 0) {
    toast.show({
      type: "danger",
      innerHtml: result.brokenRules[0].message!
    });
  }

  return false;
};

defineExpose<BaseFormExpose>({
  validate
});
</script>

<template>
  <dx-validation-group ref="validationGroup">
    <form @submit.prevent.stop="onSubmit($event)">
      <button type="submit" class="absolute invisible"></button>
      <slot></slot>
    </form>
  </dx-validation-group>
</template>

<style lang="less">
</style>