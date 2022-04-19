<script lang="ts" setup>
import { getGridDescriptionInfo, GridInfoProvider } from "@/components/grid-info-provider";
import { inject, ref, watchEffect } from "vue";

const props = defineProps<{
  span?: string;
}>();

const style = ref<Record<string, string>>({});
const gridInfoProvider = inject<GridInfoProvider>(GridInfoProvider.name);

watchEffect(() => {
  if (!gridInfoProvider?.size) {
    return;
  }

  const maxCols = gridInfoProvider?.cols || 1;
  let span = parseInt(getGridDescriptionInfo(gridInfoProvider.size, props.span || "0") || "0");
  if (span > maxCols) {
    span = maxCols;
  }
  
  style.value.gridColumn = span
    ? `span ${span}`
    : "";
});
</script>

<template>
<div :style="style">
  <slot></slot>
</div>
</template>

<style lang="less">
</style>