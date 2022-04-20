<script lang="ts" setup>
import { computed, onUnmounted, ref, watch, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  contentTransition?: string;
  contentX?: "left" | "center" | "right";
  contentY?: "top" | "center" | "bottom";
  delay?: number;
  fullScreen?: boolean;
  shader?: boolean;
  visible?: boolean;
}>(), {
  contentTransition: "base-overlay-default",
  contentX: "center",
  contentY: "center",
  delay: 200,
  fullScreen: true,
  shader: true,
  visible: false
});
const emits = defineEmits<{
  (e: "overlay-hidden", v: null): void
}>();

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
const overlayVisible = ref(false);
const contentVisible = ref(false);

document.body.addEventListener("wheel", handleWheel, {
  passive: false
});

watch(() => props.visible, (v) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  if (v) {
    overlayVisible.value = true;
    timeout = setTimeout(() => {
      contentVisible.value = true;
      overlayStyle.value["base-overlay--content-visible"] = true;
    }, props.delay);
    
  } else {
    contentVisible.value = false;
    overlayStyle.value["base-overlay--content-visible"] = false;
  }
}, {
  immediate: true
});

onUnmounted(() => {
  document.body.removeEventListener("wheel", handleWheel);
});

function handleWheel(ev: Event) {
  if (props.visible && props.fullScreen) {
    ev.preventDefault();
    return false;
  }
}
function onAfterLeave() {
  overlayVisible.value = false;
  emits("overlay-hidden", null);
}
</script>

<template>
  <div
    v-if="overlayVisible"
    class="base-overlay absolute top-0 bottom-0 left-0 right-0 bg-transparent z-40"
    :class="overlayStyle">

    <div
      class="base-overlay__shader absolute w-full h-full bg-white opacity-0 transition duration-300 hidden">
    </div>

    <transition 
      :name="props.contentTransition"
      @after-leave="onAfterLeave()">
      <div
        v-if="overlayVisible"
        v-show="contentVisible"
        class="base-overlay__content absolute flex w-full h-full transition duration-300"
        :class="contentStyle">

        <slot></slot>

      </div>
    </transition>

  </div>
</template>

<style lang="less">
.base-overlay {
  --anim-translate-x: 0;
  --anim-translate-y: 0;
  --anim-scale: 1;
  --anim-opacity: 0;

  &.base-overlay--full-screen {
  @apply fixed;
  }

  &.base-overlay--content-visible {
    .base-overlay__shader {
    @apply opacity-70;
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

.base-overlay-default-enter-from, .base-overlay-default-leave-to {
  opacity: var(--anim-opacity);
  transform: translateX(var(--anim-translate-x)) translateY(var(--anim-translate-y)) scale(var(--anim-scale));
}
</style>