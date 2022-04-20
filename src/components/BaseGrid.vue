<script lang="ts" setup>
import { getGridDescriptionInfo, GridInfoProvider } from "@/components/grid-info-provider";
import { useResizeObserver } from "@vueuse/core";
import { onMounted, provide, ref, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  cols?: string;
  gap?: string;
}>(), {
  cols: "d4",
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
  
  const columnDescription = getGridDescriptionInfo(gridInfoProvider.value.size, getCols()) || "1";
  
  if (isColumnCount(columnDescription)) {
    gridInfoProvider.value.cols = parseInt(columnDescription);
    style.value.gridTemplateColumns = `repeat(${columnDescription}, minmax(0, 1fr))`;
  } else {
    const tokens = columnDescription.split(";");
    gridInfoProvider.value.cols = tokens.length;
    style.value.gridTemplateColumns = tokens.join(" ");    
  }
  
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
function getCols() {
  switch (props.cols) {
    case "d6": {
      return "1 s:2 m:3 l:4 xl:6";
    }
    case "d4": {
      return "1 m:2 l:4";
    }
    case "d2": {
      return "1 l:2";
    }
    default: {
      return props.cols;
    }
  }
}
function isColumnCount(columnDescription: string) {
  const num = Number(columnDescription);
  if (Number.isInteger(num)) {
    if (num <= 0) {
      throw new Error(`Column count ${num} not possible`);
    } 
    return true;
  }
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