<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  fullScreen?: boolean;
  shader?: boolean;
  visible?: boolean
}>(), {
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
    }, 200);
  } else {
    document.body.style.overflow = defaultBodyOverflow;
    overlayStyle.value["base-overlay--content-visible"] = false;
  }
});
</script>

<template>
  <div
    class="base-overlay"
    :class="overlayStyle">

    <div class="base-overlay__shader"></div>
    <div class="base-overlay__content">
      <div>
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<style lang="less">
.base-overlay {
@apply absolute top-0 bottom-0 left-0 right-0 bg-transparent z-40 hidden;

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

.base-overlay__shader {
@apply absolute w-full h-full bg-white opacity-0 transition duration-300 hidden;
}

.base-overlay__content {
@apply absolute flex items-center justify-center w-full h-full opacity-0 transition duration-500;
}
</style>