<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  contentX?: "left" | "center" | "right";
  contentY?: "top" | "center" | "bottom";
  dlay?: number;
  fullScreen?: boolean;
  shader?: boolean;
  visible?: boolean;
}>(), {
  contentX: "center",
  contentY: "center",
  delay: 200,
  fullScreen: true,
  shader: true,
  visible: false
});

const overlayStyle = ref({
  "base-overlay--full-screen": false,
  "base-overlay--visible": false,
  "base-overlay--content-visible": false,
  "base-overlay--shader-visible": false
});

const contentStyle = computed(() => {
  const r: Record<string, boolean> = {};
  r["base-overlay__content-x-" + props.contentX] = true;
  r["base-overlay__content-y-" + props.contentY] = true;
  return r;
});

watchEffect(() => {
  overlayStyle.value["base-overlay--full-screen"] = props.fullScreen;
});
watchEffect(() => {
  overlayStyle.value["base-overlay--shader-visible"] = props.shader;
});

let timeout: number | null;
let defaultBodyOverflow = document.body.style.overflow;

watch(() => props.visible, (v) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  overlayStyle.value["base-overlay--visible"] = v;

  if (v) {
    if (props.fullScreen) {
      document.body.style.overflow = "hidden";
    }

    timeout = setTimeout(() => {
      overlayStyle.value["base-overlay--content-visible"] = true;
    }, props.delay);
  } else {
    document.body.style.overflow = defaultBodyOverflow;
    overlayStyle.value["base-overlay--content-visible"] = false;
  }
});
</script>

<template>
  <div
    class="base-overlay absolute top-0 bottom-0 left-0 right-0 bg-transparent z-40 hidden"
    :class="overlayStyle">

    <div 
      class="base-overlay__shader absolute w-full h-full bg-white opacity-0 transition duration-300 hidden">
    </div>
    
    <div 
      class="base-overlay__content absolute flex w-full h-full opacity-0 transition duration-500"
      :class="contentStyle">

      <slot></slot>
      
    </div>

  </div>
</template>

<style lang="less">
.base-overlay {

  &.base-overlay--full-screen {
  @apply fixed;
  }

  &.base-overlay--visible {
  @apply block;
  }

  &.base-overlay--content-visible {
    .base-overlay__shader {
    @apply opacity-70;
    }

    .base-overlay__content {
    @apply opacity-100;
    }
  }

  &.base-overlay--shader-visible {
    .base-overlay__shader {
    @apply block;
    }
  }
}

.base-overlay__content-x-left {
@apply justify-start;
}

.base-overlay__content-x-center {
@apply justify-center;
}

.base-overlay__content-x-right {
@apply justify-end;
}

.base-overlay__content-y-top {
@apply items-start;
}

.base-overlay__content-y-center {
@apply items-center;
}

.base-overlay__content-y-bottom {
@apply items-end;
}
</style>