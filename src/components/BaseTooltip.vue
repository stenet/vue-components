<script lang="ts" setup>
import { DxTooltip } from "devextreme-vue/tooltip";
import { computed, ref } from "vue";

const props = defineProps<{
  text?: string
}>();

const container = ref<HTMLDivElement>();

const mouseOver = ref(false);
const visible = computed(() => {
  return !!props.text && mouseOver.value;
});

function onMouseEnter() {
  mouseOver.value = true;
}
function onMouseLeave() {
  mouseOver.value = false;
}
</script>

<template>
  <div
    class="base-tooltip inline"
    ref="container"
    @mouseenter="onMouseEnter()"
    @mouseleave="onMouseLeave()">
    <dx-tooltip
      :target="container"
      :visible="visible">
      <div>
        {{ props.text }}
      </div>
    </dx-tooltip>
    <slot></slot>
  </div>
</template>

<style lang="less">

</style>