<script lang="ts" setup>
import { getGridDescriptionInfo, GridInfoProvider } from "@/components/grid-info-provider";
import { useResizeObserver } from "@vueuse/core";
import { onMounted, provide, ref, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  cols?: string;
  gap?: string;
}>(), {
  cols: "1 s:2 m:3 l:4 xl:6",
  gap: "1rem",
});

const grid = ref<HTMLDivElement>();
const style = ref<Record<string, string>>({});

const gridInfoProvider = ref(new GridInfoProvider());
provide(GridInfoProvider.name, gridInfoProvider.value);

watchEffect(() => {
  if (!gridInfoProvider.value.size) {
    return;
  }
  
  const columns = parseInt(getGridDescriptionInfo(gridInfoProvider.value.size, props.cols) || "1");
  gridInfoProvider.value.cols = columns;
  
  style.value.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  style.value.gap = props.gap;
});

useResizeObserver(grid, updateSize);

onMounted(() => {
  updateSize();
});

function updateSize() {
  const width = grid.value?.clientWidth || 0;
  if (!width) {
    return;
  }
  
  if (width >= 1200) {
    gridInfoProvider.value.size = "xl";
  } else if (width >= 992) {
    gridInfoProvider.value.size = "l";
  } else if (width >= 768) {
    gridInfoProvider.value.size = "m";
  } else if (width >= 576) {
    gridInfoProvider.value.size = "s";
  } else {
    gridInfoProvider.value.size = "xs";
  }
}
function getColCount() {
  props.cols.split(' ');
}
</script>

<template>
  <div 
      class="base-grid grid" 
      ref="grid" 
      :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less">
</style>